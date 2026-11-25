#!/usr/bin/env python3
"""Run the CDi (Cultural Disclosure index) benchmark.

For each term: elicit an explanation from the model under test, then have a judge
model score Disclosure (D), Universality (U), Plurality (P). Writes a per-term
results CSV and prints the aggregate CDi triple.

Usage:
  python3 benchmark/cdi/run.py --model mock:demo --judge mock:demo --limit 5
  python3 benchmark/cdi/run.py --model anthropic:claude-opus-4-8 \
                               --judge anthropic:claude-opus-4-8

Keys are read from the environment or a .env file in the repo root.
Results land in benchmark/results/<provider>-<model>-<date>.csv when --date is
given (date is passed in, not generated, for reproducibility).
"""
import argparse
import csv
import json
import os
import re
import sys


HERE = os.path.dirname(os.path.abspath(__file__))
BENCH = os.path.dirname(HERE)
ROOT = os.path.dirname(BENCH)
sys.path.insert(0, HERE)
import providers  # noqa: E402

TERMS = os.path.join(ROOT, "data", "hidden-curriculum.csv")
PROMPTS = os.path.join(BENCH, "prompts")
RESULTS = os.path.join(BENCH, "results")


def load_terms(limit=None):
    """Read validated terms from the master CSV, the single source of truth."""
    rows = []
    with open(TERMS, newline="") as f:
        for r in csv.DictReader(f):
            rows.append({
                "id": r["term_id"],
                "term": r["term"],
                "domain": r["cultural_domain"],
                "cultural_source": r["what_americans_see"],
                "non_american_reading": r["what_non_americans_read"],
                "layer_1_cultural": r["affects_all_non_americans"] == "yes",
            })
    if limit:
        rows = rows[:limit]
    return rows


def read_prompt(name):
    with open(os.path.join(PROMPTS, name)) as f:
        return f.read()


def fill(template, **values):
    """Replace only {named} placeholders, leaving literal JSON braces intact."""
    out = template
    for key, val in values.items():
        out = out.replace("{" + key + "}", str(val))
    return out


def parse_judge_json(text):
    """Extract the JSON object from a judge response."""
    m = re.search(r"\{.*\}", text, re.DOTALL)
    if not m:
        raise ValueError(f"no JSON in judge output: {text[:120]!r}")
    obj = json.loads(m.group(0))
    return float(obj["D"]), int(obj["U"]), int(obj["P"]), obj.get("rationale", "")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", required=True, help="model under test, e.g. anthropic:claude-opus-4-8")
    ap.add_argument("--judge", required=True, help="judge model, e.g. anthropic:claude-opus-4-8")
    ap.add_argument("--limit", type=int, default=None, help="only first N terms")
    ap.add_argument("--elicit-prompt", default="elicit.v1.txt")
    ap.add_argument("--judge-prompt", default="judge.v1.txt")
    ap.add_argument("--date", default=None, help="YYYY-MM-DD stamp for the output filename")
    ap.add_argument("--out", default=None, help="explicit output CSV path")
    args = ap.parse_args()

    providers.load_dotenv(ROOT)
    elicit_tmpl = read_prompt(args.elicit_prompt)
    judge_tmpl = read_prompt(args.judge_prompt)
    terms = load_terms(args.limit)

    os.makedirs(RESULTS, exist_ok=True)
    if args.out:
        out_path = args.out
    else:
        safe = args.model.replace(":", "-").replace("/", "-")
        stamp = f"-{args.date}" if args.date else ""
        out_path = os.path.join(RESULTS, f"{safe}{stamp}.csv")

    rows_out = []
    ds, us, ps = [], [], []
    print(f"CDi: model={args.model} judge={args.judge} terms={len(terms)}\n")
    for i, t in enumerate(terms, 1):
        elicit = fill(elicit_tmpl, term=t["term"])
        response = providers.complete(args.model, elicit)
        judge_prompt = fill(
            judge_tmpl, term=t["term"], cultural_source=t["cultural_source"],
            non_american_reading=t["non_american_reading"], response=response)
        judge_raw = providers.complete(args.judge, judge_prompt)
        D, U, P, rationale = parse_judge_json(judge_raw)
        ds.append(D); us.append(U); ps.append(P)
        rows_out.append({
            "id": t["id"], "term": t["term"], "domain": t["domain"],
            "layer_1_cultural": t.get("layer_1_cultural"),
            "D": D, "U": U, "P": P, "rationale": rationale,
            "response": response.replace("\n", " ").strip(),
        })
        print(f"  [{i:>3}/{len(terms)}] {t['term']:<22} D={D} U={U} P={P}")

    fields = ["id", "term", "domain", "layer_1_cultural", "D", "U", "P",
              "rationale", "response"]
    with open(out_path, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows_out)

    n = len(rows_out)
    Dbar = sum(ds) / n
    Ubar = sum(us) / n
    Pbar = sum(ps) / n
    print(f"\nCDi for {args.model}  (n={n})")
    print(f"  D (disclosure, higher better):  {Dbar:.2f}")
    print(f"  U (universality, lower better): {Ubar:.2f}")
    print(f"  P (plurality, higher better):   {Pbar:.2f}")
    print(f"\nWrote {out_path}")


if __name__ == "__main__":
    main()
