// One place for every external address the site uses.
export const OWNER = 'brettleehari';
export const REPO = 'hidden-curriculum';
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const DATASET_URL = `https://huggingface.co/datasets/${OWNER}/${REPO}`;
export const PAPER_URL = `${REPO_URL}/blob/main/paper/The_Hidden_Curriculum.pdf`;

// Optional serverless endpoint (api/submit-term.js). When unset, the form
// hands the contributor to a prefilled GitHub issue instead.
export const SUBMIT_API = import.meta.env.VITE_SUBMIT_API || '';
