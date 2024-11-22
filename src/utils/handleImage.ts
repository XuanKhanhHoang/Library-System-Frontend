export function extractFileIdFromDiveLink(
  url: string | undefined
): string | null {
  if (!url) return null;
  if (url.includes("id=")) {
    const startIndex = url.indexOf("id=") + 3;
    const endIndex = url.indexOf("&", startIndex);
    if (endIndex === -1) {
      return url.substring(startIndex);
    } else {
      return url.substring(startIndex, endIndex);
    }
  } else if (url.includes("export=view&id=")) {
    const startIndex = url.indexOf("export=view&id=") + 14;
    const endIndex = url.indexOf("&", startIndex);
    if (endIndex === -1) {
      return url.substring(startIndex);
    } else {
      return url.substring(startIndex, endIndex);
    }
  } else {
    // Invalid URL format
    return null;
  }
}
export function getWebViewLinkFromDiveId(id: string): string {
  return `https://lh3.googleusercontent.com/d/${id}`;
}
export function getWebViewLinkFromWebContentLink(
  url: string | undefined
): string | undefined {
  if (!url) return undefined;
  let id: string | null = extractFileIdFromDiveLink(url);
  if (id) return getWebViewLinkFromDiveId(id);
  return url;
}
