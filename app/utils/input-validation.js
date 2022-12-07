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

export function isValidName(nameInput) {
  var validRegex = "^[a-z]+$";
  return nameInput.match(validRegex) && nameInput.length > 0;
}
