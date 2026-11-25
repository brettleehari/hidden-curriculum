import { REPO_URL, SUBMIT_API } from '../config';

// Field ids match .github/ISSUE_TEMPLATE/new-term.yml, so GitHub prefills
// the issue form from the query string.
export function buildIssueUrl(formData) {
  const params = new URLSearchParams({
    template: 'new-term.yml',
    title: `New Term: ${formData.term}`,
    term: formData.term,
    domain: formData.cultural_domain,
    what_americans_see: formData.what_americans_see,
    what_software_means: formData.what_software_means,
    where_it_appears: formData.where_it_appears,
    what_non_americans_read: formData.what_non_americans_read,
    affects_all: formData.affects_all_non_americans === 'yes' ? 'Yes' : 'No',
    neutral_alternative: formData.neutral_alternative,
    contributor_name: formData.contributor_name,
    contributor_country: formData.contributor_country,
    personal_story: formData.personal_story,
  });
  return `${REPO_URL}/issues/new?${params}`;
}

// With an API configured, the server creates the issue. Without one, the
// contributor finishes the submission on GitHub with the form prefilled.
// Both paths end in the same place: an issue on the review line.
export async function submitTerm(formData) {
  if (!SUBMIT_API) {
    const issueUrl = buildIssueUrl(formData);
    window.open(issueUrl, '_blank', 'noopener');
    return { success: true, mode: 'github', issueUrl };
  }

  const response = await fetch(SUBMIT_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error(`Submission failed: ${response.status}`);
  }
  return { ...(await response.json()), mode: 'api' };
}
