export const date = new Date();
export const CURRENT_DATE  = date.getDate().toString().padStart(2, '00');
export const CURRENT_MONTH = (date.getMonth() + 1).toString().padStart(2, '00');
export const CURRENT_TIME  = `${date.getHours()}:${date.getMinutes() < 10 ? '00' : date.getMinutes().toString().charAt(0)+'0'}`;

export const TIME_STAMP = `${CURRENT_DATE}/${CURRENT_MONTH}/${date.getFullYear()} ${CURRENT_TIME}`;