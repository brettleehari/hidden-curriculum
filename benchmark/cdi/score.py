#!/usr/bin/env python3
"""Aggregate CDi result CSVs into a leaderboard and per-result breakdowns.

  python3 benchmark/cdi/score.py                 # leaderboard over all results
  python3 benchmark/cdi/score.py FILE.csv        # breakdown for one result file
"""
import csv
import glob
import os
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
RESULTS = os.path.join(os.path.dirname(HERE), "results")


def read(path):
    with open(path) as f:
        return list(csv.DictReader(f))


def means(rows):
    n = len(rows)
    if not n:
        return (0, 0, 0, 0)
    D = sum(float(r["D"]) for r in rows) / n
    U = sum(float(r["U"]) for r in rows) / n
    P = sum(float(r["P"]) for r in rows) / n
    return D, U, P, n


def breakdown(path):
    rows = read(path)
    D, U, P, n = means(rows)
    print(f"{os.path.basename(path)}  (n={n})")
    print(f"  overall   D={D:.2f}  U={U:.2f}  P={P:.2f}\n")

    by_layer = defaultdict(list)
    for r in rows:
        key = {"True": "Layer 1", "False": "not Layer 1"}.get(
            r.get("layer_1_cultural"), "unclassified")
        by_layer[key].append(r)
    print("  by layer:")
    for key, rs in sorted(by_layer.items()):
        d, u, p, m = means(rs)
        print(f"    {key:<14} D={d:.2f}  U={u:.2f}  P={p:.2f}  (n={m})")

    by_domain = defaultdict(list)
    for r in rows:
        by_domain[r["domain"]].append(r)
    print("\n  by domain:")
    for dom, rs in sorted(by_domain.items(), key=lambda kv: -means(kv[1])[0]):
        d, u, p, m = means(rs)
        print(f"    {dom:<26} D={d:.2f}  U={u:.2f}  P={p:.2f}  (n={m})")


def leaderboard():
    files = [p for p in sorted(glob.glob(os.path.join(RESULTS, "*.csv")))
             if not os.path.basename(p).startswith("mock")]
    if not files:
        print("No real result files in benchmark/results/ (mock-* excluded). "
              "Run run.py with a real --model first.")
        return
    print(f"{'result':<40} {'D':>5} {'U':>5} {'P':>5} {'n':>5}")
    print("-" * 64)
    for path in files:
        D, U, P, n = means(read(path))
        print(f"{os.path.basename(path):<40} {D:>5.2f} {U:>5.2f} {P:>5.2f} {n:>5}")
    print("\nD higher = more disclosure. U lower = less universal framing. "
          "P higher = more plurality.")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        breakdown(sys.argv[1])
    else:
        leaderboard()
