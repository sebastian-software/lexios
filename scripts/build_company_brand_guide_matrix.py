#!/usr/bin/env python3

import csv
import html
import json
import re
import socket
import ssl
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Dict, Iterable, List, Optional
from urllib.parse import urljoin, urlparse


ssl._create_default_https_context = ssl._create_unverified_context
socket.setdefaulttimeout(4)

WIKIPEDIA_URL = "https://de.wikipedia.org/wiki/Liste_der_gr%C3%B6%C3%9Ften_Unternehmen_der_Welt"

MANUAL_WEBSITE_MAP: Dict[str, str] = {
    "Amazon.com": "https://www.amazon.com/",
    "State Grid": "https://www.sgcc.com.cn/",
    "CVS Health": "https://www.cvshealth.com/",
    "Shell": "https://www.shell.com/",
    "Ford Motor": "https://www.ford.com/",
    "Home Depot": "https://www.homedepot.com/",
    "BMW Group": "https://www.bmwgroup.com/",
    "Shandong Energy Group": "http://www.shandong-energy.com/",
    "Tencent": "https://www.tencent.com/en-us/",
    "AbbVie": "https://www.abbvie.com/",
    "LVMH": "https://www.lvmh.com/",
    "Hoffmann-La Roche": "https://www.roche.com/",
    "Salesforce.com": "https://www.salesforce.com/",
    "International Holding Company": "https://www.ihcuae.com/",
    "Merck": "https://www.merck.com/",
    "Pepsico": "https://www.pepsico.com/",
    "Amgen": "https://www.amgen.com/",
    "CATL": "https://www.catl.com/en/",
    "Mitsubishi UFJ Financial": "https://www.mufg.jp/english/",
    "AXA": "https://www.axa.com/",
    "BBVA": "https://www.bbva.com/en/",
    "CNOOC": "https://www.cnoocltd.com/",
    "Honda Motor": "https://global.honda/en/",
    "Bank of Nova Scotia": "https://www.scotiabank.com/",
    "Coca-Cola": "https://www.coca-colacompany.com/",
}

HIGH_SIGNAL_PATHS = [
    "/brand",
    "/branding",
    "/brand-guidelines",
    "/brand-center",
    "/brand-assets",
    "/design",
    "/logos",
    "/logo",
    "/media-kit",
    "/press",
    "/newsroom",
    "/media",
]

RICH_TERMS = [
    "brand center",
    "brandcentre",
    "brand guide",
    "brand guidelines",
    "brand assets",
    "brand resources",
    "design system",
    "visual identity",
    "identity guidelines",
    "identity standards",
    "tone of voice",
    "voice and tone",
    "style guide",
    "styleguide",
    "logo guidelines",
    "logo usage",
]

PARTIAL_TERMS = [
    "corporate culture",
    "our brand",
    "brand story",
    "logo",
    "logos",
    "media kit",
    "media center",
    "media centre",
    "newsroom",
    "press room",
    "pressroom",
    "press release",
    "downloads",
    "download center",
    "download centre",
    "download",
]

MINIMAL_TERMS = [
    "news",
    "media",
    "press",
    "investor relations",
    "about us",
    "about",
]

LINK_KEYWORDS = [
    "brand",
    "branding",
    "logo",
    "logos",
    "media",
    "press",
    "newsroom",
    "design",
    "identity",
    "culture",
    "downloads",
]

UA = "Mozilla/5.0 (compatible; BrandIDResearch/1.0; +https://example.com)"
LINK_RE = re.compile(r'href=["\']([^"\']+)["\']', re.I)


def fetch_text(url: str, timeout: float = 2.5, max_bytes: int = 90000) -> Optional[dict]:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            final_url = resp.geturl()
            content_type = resp.headers.get("Content-Type", "")
            raw = resp.read(max_bytes)
    except Exception:
        return None
    return {
        "url": final_url,
        "content_type": content_type,
        "text": raw.decode("utf-8", errors="ignore"),
    }


def fetch_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=12) as resp:
        return json.loads(resp.read().decode("utf-8", errors="ignore"))


def wikipedia_html_path(output_dir: Path) -> Path:
    return output_dir / "source-wikipedia-largest-companies.html"


def download_wikipedia_page(output_dir: Path) -> str:
    data = fetch_text(WIKIPEDIA_URL, timeout=12, max_bytes=500000)
    if not data:
        raise RuntimeError("Could not download the Wikipedia source page.")
    html_text = data["text"]
    wikipedia_html_path(output_dir).write_text(html_text, encoding="utf-8")
    return html_text


def extract_company_rows(html_text: str) -> List[dict]:
    starts = [m.start() for m in re.finditer(r'<table class="wikitable sortable"', html_text)]
    rows: List[dict] = []
    for idx, start in enumerate(starts):
        end = starts[idx + 1] if idx + 1 < len(starts) else html_text.find("</table>", start) + 8
        table = html_text[start:end]
        cells = re.findall(r"<tr>\s*<td>.*?</td>\s*<td>(.*?)</td>", table, flags=re.S)
        for cell in cells:
            match = re.search(r'<a href="([^"]+)"[^>]*title="([^"]+)"', cell)
            if not match:
                continue
            href = html.unescape(match.group(1))
            title = html.unescape(match.group(2)).strip()
            name = html.unescape(re.sub(r"<.*?>", "", cell)).strip()
            rows.append({"company": name, "wiki_title": title, "wiki_href": href})
    unique: List[dict] = []
    seen = set()
    for row in rows:
        key = row["wiki_href"].lower()
        if key not in seen:
            seen.add(key)
            unique.append(row)
    return unique


def batched(items: Iterable[str], size: int) -> Iterable[List[str]]:
    batch: List[str] = []
    for item in items:
        batch.append(item)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch


def query_wikibase_items(companies: List[dict]) -> Dict[str, str]:
    mapping: Dict[str, str] = {}
    titles = [c["wiki_title"] for c in companies]
    for batch in batched(titles, 40):
        params = {
            "action": "query",
            "prop": "pageprops",
            "ppprop": "wikibase_item",
            "format": "json",
            "formatversion": "2",
            "titles": "|".join(batch),
        }
        url = "https://de.wikipedia.org/w/api.php?" + urllib.parse.urlencode(params)
        data = fetch_json(url)
        for page in data["query"]["pages"]:
            qid = page.get("pageprops", {}).get("wikibase_item")
            if qid:
                mapping[page["title"]] = qid
    return mapping


def query_official_websites(qids: Iterable[str]) -> Dict[str, List[str]]:
    websites: Dict[str, List[str]] = {}
    qids = sorted(set(qids))
    for batch in batched(qids, 50):
        values = " ".join(f"wd:{qid}" for qid in batch)
        query = f"SELECT ?item ?website WHERE {{ VALUES ?item {{ {values} }} ?item wdt:P856 ?website . }}"
        url = "https://query.wikidata.org/sparql?format=json&query=" + urllib.parse.quote(query, safe="")
        data = fetch_json(url)
        for row in data["results"]["bindings"]:
            qid = row["item"]["value"].rsplit("/", 1)[-1]
            website = row["website"]["value"]
            websites.setdefault(qid, []).append(website)
    for qid, values in websites.items():
        websites[qid] = sorted(set(values), key=lambda x: (0 if x.startswith("https://") else 1, len(x)))
    return websites


def official_site_for_company(company: dict, qid_map: Dict[str, str], website_map: Dict[str, List[str]]) -> Optional[str]:
    qid = qid_map.get(company["wiki_title"])
    if qid and qid in website_map:
        return website_map[qid][0]
    return MANUAL_WEBSITE_MAP.get(company["company"])


def same_domain(base_url: str, other_url: str) -> bool:
    base = urlparse(base_url).netloc.replace("www.", "")
    other = urlparse(other_url).netloc.replace("www.", "")
    if not base or not other:
        return False
    return base in other or other in base


def score_page(page: dict) -> Optional[dict]:
    blob = (page["url"] + " " + page["text"][:12000]).lower()
    if any(term in blob for term in RICH_TERMS):
        return {"status": "rich_brand", "signal": "rich_term"}
    if any(term in blob for term in PARTIAL_TERMS):
        return {"status": "partial_official_material", "signal": "partial_term"}
    if any(term in blob for term in MINIMAL_TERMS):
        return {"status": "minimal_official_material", "signal": "minimal_term"}
    return None


def extract_candidate_links(homepage: dict, limit: int = 4) -> List[str]:
    hits: List[str] = []
    for href in LINK_RE.findall(homepage["text"]):
        full = urljoin(homepage["url"], href)
        low = full.lower()
        if any(keyword in low for keyword in LINK_KEYWORDS):
            hits.append(full)
    dedup: List[str] = []
    seen = set()
    for hit in hits:
        if hit not in seen and same_domain(homepage["url"], hit):
            dedup.append(hit)
            seen.add(hit)
    return dedup[:limit]


def classify_company(company: dict, official_site: Optional[str]) -> dict:
    result = {
        "company": company["company"],
        "wiki_title": company["wiki_title"],
        "wiki_href": "https://de.wikipedia.org" + company["wiki_href"],
        "official_site": official_site or "",
        "status": "not_yet_confirmed",
        "keep_for_brand_guide_pool": "no",
        "evidence_url": "",
        "evidence_type": "",
        "notes": "",
    }
    if not official_site:
        result["notes"] = "No official website mapping resolved from Wikidata or manual fallbacks."
        return result

    base = official_site if official_site.startswith("http") else "https://" + official_site
    homepage = fetch_text(base)
    if not homepage:
        result["notes"] = "Official website did not respond within the scan budget."
        return result

    best = None

    def absorb(page: dict) -> Optional[dict]:
        nonlocal best
        scored = score_page(page)
        if not scored:
            return None
        candidate = {
            "status": scored["status"],
            "evidence_url": page["url"],
            "evidence_type": scored["signal"],
        }
        rank = {
            "rich_brand": 3,
            "partial_official_material": 2,
            "minimal_official_material": 1,
            "not_yet_confirmed": 0,
        }
        if not best or rank[candidate["status"]] > rank[best["status"]]:
            best = candidate
        return candidate

    initial = absorb(homepage)
    if initial and initial["status"] == "rich_brand":
        best = initial

    seen_urls = {homepage["url"]}

    if not best or best["status"] not in {"rich_brand", "partial_official_material"}:
        for link in extract_candidate_links(homepage):
            if link in seen_urls:
                continue
            page = fetch_text(link)
            if not page or not same_domain(homepage["url"], page["url"]) or page["url"] in seen_urls:
                continue
            seen_urls.add(page["url"])
            candidate = absorb(page)
            if candidate and candidate["status"] in {"rich_brand", "partial_official_material"}:
                break
    if not best or best["status"] not in {"rich_brand", "partial_official_material"}:
        for path in HIGH_SIGNAL_PATHS:
            page = fetch_text(urljoin(homepage["url"], path))
            if not page or not same_domain(homepage["url"], page["url"]) or page["url"] in seen_urls:
                continue
            seen_urls.add(page["url"])
            candidate = absorb(page)
            if candidate and candidate["status"] in {"rich_brand", "partial_official_material"}:
                break

    if not best:
        result["notes"] = "No brand-guide, media, logo, or culture signal was found on the scanned official-domain pages."
        return result

    result["status"] = best["status"]
    result["evidence_url"] = best["evidence_url"]
    result["evidence_type"] = best["evidence_type"]
    result["keep_for_brand_guide_pool"] = "yes" if best["status"] in {"rich_brand", "partial_official_material"} else "no"

    if best["status"] == "rich_brand":
        result["notes"] = "Useful official brand-guide material is available."
    elif best["status"] == "partial_official_material":
        result["notes"] = "Official brand-adjacent material exists, but it is thinner than a full brand guide."
    else:
        result["notes"] = "Only thin official material surfaced in the scan budget."
    return result


def write_csv(rows: List[dict], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "company",
        "wiki_title",
        "wiki_href",
        "official_site",
        "status",
        "keep_for_brand_guide_pool",
        "evidence_url",
        "evidence_type",
        "notes",
    ]
    with output_path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def write_markdown(rows: List[dict], output_path: Path) -> None:
    counts: Dict[str, int] = {}
    for row in rows:
        counts[row["status"]] = counts.get(row["status"], 0) + 1

    keep = [row["company"] for row in rows if row["keep_for_brand_guide_pool"] == "yes"]
    drop = [row["company"] for row in rows if row["keep_for_brand_guide_pool"] == "no"]

    lines = [
        "# Brand Guide Matrix: World's Largest Companies",
        "",
        "Stand: 2026-04-13",
        "",
        "## Summary",
        "",
        f"- Gesamtunternehmen im Sweep: `{len(rows)}`",
        f"- `rich_brand`: `{counts.get('rich_brand', 0)}`",
        f"- `partial_official_material`: `{counts.get('partial_official_material', 0)}`",
        f"- `minimal_official_material`: `{counts.get('minimal_official_material', 0)}`",
        f"- `not_yet_confirmed`: `{counts.get('not_yet_confirmed', 0)}`",
        "",
        "## Keep / Drop Rule",
        "",
        "- `keep_for_brand_guide_pool = yes` for `rich_brand` and `partial_official_material`.",
        "- `keep_for_brand_guide_pool = no` for `minimal_official_material` and `not_yet_confirmed`.",
        "",
        "## Notes",
        "",
        "- The scan is intentionally optimized for useful public brand-guide material, not for investor relations completeness.",
        "- Some official sites, especially slower or weakly indexed corporate domains, may under-report in this first automated pass.",
        "- The full row-level matrix lives in the companion CSV.",
        "",
        "## First 25 Drop Candidates",
        "",
    ]
    for name in drop[:25]:
        lines.append(f"- {name}")
    lines.extend(
        [
            "",
            "## First 25 Keep Candidates",
            "",
        ]
    )
    for name in keep[:25]:
        lines.append(f"- {name}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    if len(sys.argv) > 1:
        output_dir = Path(sys.argv[1]).resolve()
    else:
        output_dir = (Path.cwd() / "docs" / "brand-id" / "coverage").resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    html_text = download_wikipedia_page(output_dir)
    companies = extract_company_rows(html_text)
    qid_map = query_wikibase_items(companies)
    website_map = query_official_websites(qid_map.values())

    results: List[dict] = []
    with ThreadPoolExecutor(max_workers=32) as executor:
        futures = {}
        for company in companies:
            official_site = official_site_for_company(company, qid_map, website_map)
            futures[executor.submit(classify_company, company, official_site)] = company["company"]
        for index, future in enumerate(as_completed(futures), start=1):
            results.append(future.result())
            if index % 25 == 0:
                print(f"processed {index}/{len(companies)}", flush=True)

    results.sort(key=lambda row: row["company"].lower())
    write_csv(results, output_dir / "world-largest-companies-brand-guide-matrix.csv")
    write_markdown(results, output_dir / "world-largest-companies-brand-guide-matrix.md")
    print(f"Wrote {len(results)} company rows to {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
