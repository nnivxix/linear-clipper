export const createIssue = (source: string, title?: string) => {
  const isComment = source.includes("#comment");
  const issueTitle = isComment ? `Comment on ${title}` : title;
  const markdownLink = `[${issueTitle}](${source})`;

  return {
    markdownLink,
  };
};
