export const createIssue = (source: string) => {
  const urlParts = source?.split("/");
  const issueId = urlParts?.[urlParts.length - 1] || "unknown-issue";
  const markedText = `[${issueId}](${source})`;

  return {
    markedText,
  };
};
