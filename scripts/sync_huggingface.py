"""Push the master CSV, the candidate backlog and the dataset card to HuggingFace.

The GitHub repo is the source of truth. This script overwrites the mirror.
Usage: HF_TOKEN=hf_xxx python3 scripts/sync_huggingface.py
"""
import os
import sys
from pathlib import Path

from huggingface_hub import HfApi

ROOT = Path(__file__).resolve().parent.parent
REPO_ID = os.environ.get("HF_REPO", "brettleehari/hidden-curriculum")
FILES = {
    "data/hidden-curriculum.csv": "hidden-curriculum.csv",
    "data/candidates.csv": "candidates.csv",
    "data/schema.json": "schema.json",
    "huggingface/README.md": "README.md",
}

token = os.environ.get("HF_TOKEN")
if not token:
    sys.exit("HF_TOKEN is not set. Add it as a repository secret or export it locally.")

api = HfApi(token=token)
api.create_repo(REPO_ID, repo_type="dataset", exist_ok=True)
sha = os.environ.get("GITHUB_SHA", "local")[:7]
for src, dest in FILES.items():
    api.upload_file(
        path_or_fileobj=str(ROOT / src),
        path_in_repo=dest,
        repo_id=REPO_ID,
        repo_type="dataset",
        commit_message=f"Sync {dest} from GitHub ({sha})",
    )
    print(f"Uploaded {dest}")
print(f"Synced to https://huggingface.co/datasets/{REPO_ID}")
