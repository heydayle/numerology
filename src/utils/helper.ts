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

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }

    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)

    textarea.select()
    const successful = document.execCommand('copy')
    document.body.removeChild(textarea)

    return successful
  } catch (error) {
    console.error('Failed to copy: ', error)
    return false
  }
}