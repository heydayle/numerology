export function formatDate(
  date: Date | undefined,
  format: Record<string, string> = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", format)
}
