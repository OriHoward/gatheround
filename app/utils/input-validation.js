export function isValidEmail(emailInput) {
  var validRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailInput.match(validRegex) && emailInput.length > 0;
}

export function isValidPassword(passwordInput) {
  var validRegex = "^(?=.*[0-9])(?=.*[a-z]).{5,20}$";
  return passwordInput.match(validRegex) && passwordInput.length > 0;
}

export function isIdentical(passwordInput, repeatPasswordInput) {
  return passwordInput === repeatPasswordInput;
}

export function isValidStr(strInput) {
  var validRegex = "^[a-zA-Z ]+$";
  return strInput.match(validRegex) && strInput.length > 0;
}

export function isValidNumber(number) {
  var validRegex = /^\+?\d{10,13}$/;
  return number.match(validRegex) && number.length > 0;
}

export function checkCurrency(currency) {
  var validRegex = /^[A-Z]{3}$/;
  return currency.match(validRegex) && currency.length > 0;
}

