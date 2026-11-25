#!/usr/bin/env bash
# One-time repository setup: labels the review line depends on.
# Usage: scripts/setup-repo.sh [owner/repo]
set -euo pipefail
REPO="${1:-brettleehari/hidden-curriculum}"
label() { gh label create "$1" --repo "$REPO" --color "$2" --description "$3" --force; }
label new-term          1d76db "A term submission"
label pending-review    fbca04 "Waiting for a maintainer"
label ready-for-review  0e8a16 "Passed the automated review"
label needs-changes     d93f0b "Failed the automated review. Edit the issue to rerun"
label duplicate         cfd3d7 "Term already in the dataset"
label approved          0e8a16 "Maintainer approved. Close the issue to add the term"
label health            b60205 "Weekly health check found a problem"
