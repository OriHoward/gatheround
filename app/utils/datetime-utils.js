export function getBackendDateFormat(date) {
  //  backend format: %d/%m/%Y
  // +1 because Month starts from 0
  return `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
