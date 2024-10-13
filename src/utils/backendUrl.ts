export function GenerateBackendURL(childUrl: string): string {
  return "http://localhost:8081/api/v1/" + childUrl;
}
