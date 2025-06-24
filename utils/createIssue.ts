export const createIssue = (source: string) => {
  const urlParts = source?.split("/");
  const issueId = urlParts?.at(5) || "unknown-issue";
  const markdownLink = `[${issueId}](${source})`;

  return {
    markdownLink,
  };
};
