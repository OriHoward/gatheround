export function getBackendDateFormat(date) {
  //  backend format: %d/%m/%Y
  // +1 because Month starts from 0
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function getFrontendDateFormat(date) {
  const [day, month, year] = date;
  return `${year}-${month}-${day}`;
}
