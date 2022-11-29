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

export function isValidUsername(usernameInput) {
  var validRegex = "^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$";
  return usernameInput.match(validRegex) && usernameInput.length > 0;
}
