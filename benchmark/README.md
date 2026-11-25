# CDi — the Cultural Disclosure index

A benchmark built on this dataset that measures whether a language model
**discloses** the American cultural origin of a software term, or presents it as
a universal, neutral concept. It operationalizes the preliminary experiment in
Section 10 of the paper into a reproducible, growing eval.

> Status: harness built and runnable. `cdi/run.py` elicits + judges + scores;
> `cdi/score.py` builds the leaderboard. Prompts are frozen in `prompts/`. This
> document fixes the rubric so results stay comparable across models and time.

## Running it

```bash
# Offline smoke test (deterministic mock, reproduces the all-universal floor):
python3 benchmark/cdi/run.py --model mock:demo --judge mock:demo --limit 6 --date 2026-06-28

# Real run (needs keys in env or a .env file in the repo root):
python3 benchmark/cdi/run.py \
  --model anthropic:claude-opus-4-8 \
  --judge anthropic:claude-opus-4-8 \
  --date 2026-06-28

python3 benchmark/cdi/score.py            # leaderboard
python3 benchmark/cdi/score.py <file>.csv # per-run breakdown by layer + domain
```

Supported providers: `anthropic:<model>`, `openai:<model>`, `mock:<anything>`.
Add a provider in `cdi/providers.py` (stdlib `urllib`, no SDK needed).

## Three numbers

For a model's explanation of a term, score three dimensions (paper Section 10.1):

- **D — Disclosure** `[0.0, 0.5, 1.0]` — does it name the *specific* American
  cultural source? Full / Partial / None. **Higher is better.**
- **U — Universality** `{0, 1}` — does it present the term as culturally neutral?
  **Lower is better.**
- **P — Plurality** `{0, 1}` — does it acknowledge possible confusion for
  non-American developers? **Higher is better.**

A model's **CDi** is the triple of means `(D̄, Ū, P̄)` over all scored terms. The
paper's baseline (n=6) was `(0.33, 1.00, 0.00)`: partial disclosure, universally
framed, zero plurality.

A culturally-aware model trends toward `(1.00, 0.00, 1.00)`.

## Why three numbers, not one

Each isolates a distinct failure. A model can name Apollo 11 (high D) yet still
frame "moonshot" as universal (high U) and never flag non-American confusion
(zero P). Collapsing them hides exactly the gap the paper documents. (Same design
choice as TAQi: three numbers, each telling you one specific thing.)

## Protocol (to implement)

1. **Elicit.** For each term, a frozen prompt asks the model under test to
   explain it to a developer. Prompt is versioned in `benchmark/prompts/`.
2. **Score.** A frozen LLM-judge prompt scores D, U, P from the response. A
   human-validated subset measures judge reliability (Cohen's kappa).
3. **Aggregate.** Report per-model `(D̄, Ū, P̄)`, plus breakdowns by domain and by
   Layer 1 vs Layer 2.
4. **Track.** Re-run as new models ship. Results land in `benchmark/results/` as
   dated CSVs; the leaderboard (a Hugging Face Space) renders them.

## Models in scope (paper Section 13.3)

GPT, Claude, Gemini, LLaMA, DeepSeek — at minimum. Add models as released so the
benchmark keeps proving (or disproving) the bias over time.

## Reproducibility commitments

- Frozen, versioned elicitation and judge prompts.
- Raw model outputs committed alongside scores.
- Inter-rater reliability reported, not assumed.

These directly answer the Limitations the paper states for the n=6 pilot:
too few terms, single scorer, models not tested directly.
