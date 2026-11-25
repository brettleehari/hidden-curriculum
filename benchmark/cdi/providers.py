#!/usr/bin/env python3
"""Minimal model-provider layer for the CDi harness.

Stdlib only (urllib) so the benchmark has no heavy SDK dependency. Each provider
takes a prompt string and returns a text completion. Keys are read from the
environment; a .env file in the repo root is loaded if present.

Supported model strings:
  anthropic:claude-opus-4-8          (env ANTHROPIC_API_KEY)
  openai:gpt-4o                      (env OPENAI_API_KEY)
  mock:any                           (no key; deterministic, offline)
"""
import json
import os
import urllib.error
import urllib.request


def load_dotenv(root):
    """Load KEY=VALUE lines from <root>/.env into os.environ (no overwrite)."""
    path = os.path.join(root, ".env")
    if not os.path.exists(path):
        return
    with open(path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def _post(url, headers, payload):
    req = urllib.request.Request(
        url, data=json.dumps(payload).encode(), headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode())


def _anthropic(model, prompt, max_tokens=512):
    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        raise RuntimeError("ANTHROPIC_API_KEY not set")
    base = os.environ.get("ANTHROPIC_BASE_URL", "https://api.anthropic.com")
    data = _post(
        f"{base}/v1/messages",
        {"x-api-key": key, "anthropic-version": "2023-06-01",
         "content-type": "application/json"},
        {"model": model, "max_tokens": max_tokens,
         "messages": [{"role": "user", "content": prompt}]},
    )
    return "".join(b.get("text", "") for b in data.get("content", []))


def _openai(model, prompt, max_tokens=512):
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        raise RuntimeError("OPENAI_API_KEY not set")
    base = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1")
    data = _post(
        f"{base}/chat/completions",
        {"Authorization": f"Bearer {key}", "content-type": "application/json"},
        {"model": model, "max_tokens": max_tokens,
         "messages": [{"role": "user", "content": prompt}]},
    )
    return data["choices"][0]["message"]["content"]


def _mock(model, prompt, max_tokens=512):
    """Deterministic offline stand-in.

    For an elicitation prompt it returns a plausible 'universal' explanation
    (no cultural disclosure) so the pipeline exercises the worst-case baseline.
    For a judge prompt it returns valid JSON scoring that baseline.
    """
    if prompt.lstrip().startswith("You are scoring"):
        return '{"D": 0.0, "U": 1, "P": 0, "rationale": "mock: technical-only explanation."}'
    term = "this term"
    if "'" in prompt:
        try:
            term = prompt.split("'")[1]
        except IndexError:
            pass
    return (f"In software engineering, {term} refers to a standard technical "
            f"concept. It is widely used and works the same across tools. "
            f"Developers everywhere rely on it as a basic building block.")


_PROVIDERS = {"anthropic": _anthropic, "openai": _openai, "mock": _mock}


def complete(model_string, prompt, max_tokens=512):
    """model_string is '<provider>:<model>'. Returns text."""
    if ":" not in model_string:
        raise ValueError(f"model must be '<provider>:<model>', got {model_string!r}")
    provider, model = model_string.split(":", 1)
    if provider not in _PROVIDERS:
        raise ValueError(f"unknown provider {provider!r}; "
                         f"have {sorted(_PROVIDERS)}")
    return _PROVIDERS[provider](model, prompt, max_tokens)
