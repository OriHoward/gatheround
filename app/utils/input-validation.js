export function isValidEmail(emailInput) {
  let validRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailInput.match(validRegex) && emailInput.length > 0;
}

export function isValidPassword(passwordInput) {
  let validRegex = "^(?=.*[0-9])(?=.*[a-z]).{5,20}$";
  return passwordInput.match(validRegex) && passwordInput.length > 0;
}

export function isIdentical(passwordInput, repeatPasswordInput) {
  return passwordInput === repeatPasswordInput;
}

export function isValidStr(strInput) {
  let validRegex = "^[a-zA-Z ]+$";
  return strInput.match(validRegex) && strInput.length > 0;
}

export function isValidNumber(number) {
  let validRegex = /^\+?\d{10,13}$/;
  return number.match(validRegex) && number.length > 0;
}

export function isNumber(number) {
  let validRegex = /\d/;
  return number.match(validRegex) && number.length > 0;
}

export function checkCurrency(currency) {
  let validRegex = /^[A-Z]{3}$/;
  return currency.match(validRegex) && currency.length > 0;
}

export function isPrintable(str) {
  // regex checks for any printable ASCII character one or more times
  let regex = /^[\x20-\x7E]+$/;
  return str.match(regex);
}
