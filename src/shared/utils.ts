export function getTimeStamp(date = new Date()) {
  const CURRENT_DATE = date.getDate().toString().padStart(2, '00')
  const CURRENT_MONTH = (date.getMonth() + 1).toString().padStart(2, '00')

  return `${CURRENT_DATE}/${CURRENT_MONTH}/${date.getFullYear()}`
}

export function slugify(text: string) {
  return text
    .replaceAll('_', '-')
    .toLowerCase()
    .split(' ')
    .filter((word) => /[a-z0-9]/.test(word))
    .join('-')
}
