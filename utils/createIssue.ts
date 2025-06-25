export const createIssue = (source: string, title?: string) => {
  const urlParts = source?.split("/");
  const issueId = urlParts?.at(5) || "unknown-issue";
  const issueTitle = title || issueId;
  const markdownLink = `[${issueTitle}](${source})`;

  return {
    markdownLink,
  };
};
