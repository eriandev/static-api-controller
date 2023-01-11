export function getTimeStamp(date = new Date()) {
  const CURRENT_DATE = date.getDate().toString().padStart(2, '00');
  const CURRENT_MONTH = (date.getMonth() + 1).toString().padStart(2, '00');
  const CURRENT_TIME = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '00')}`;

  return `${CURRENT_DATE}/${CURRENT_MONTH}/${date.getFullYear()} ${CURRENT_TIME} GTM-0500`;
}

export function slugify(text: string): string {
  return text
    .replaceAll('_', '-')
    .toLowerCase()
    .split(' ')
    .filter((word) => /[a-z0-9]/.test(word))
    .join('-');
}
