export const stripHtmlAndTruncate = (html: string, maxLength = 100) => {
  if (!html) return "";

  const strippedText = html.replace(/<[^>]*>?/gm, "");

  if (strippedText.length > maxLength) {
    return strippedText.substring(0, maxLength) + "...";
  }

  return strippedText;
};
