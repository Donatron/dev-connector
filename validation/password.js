const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePasswordChange(data) {
  let errors = {};

  // console.log(`Current: ${data.currentPassword}`);
  // console.log(`New: ${data.newPassword}`);
  // console.log(`Confirm: ${data.newPasswordConfirm}`);

  data.currentPassword = !isEmpty(data.currentPassword)
    ? data.currentPassword
    : (data.currentPassword = "");
  data.newPassword = !isEmpty(data.newPassword)
    ? data.newPassword
    : (data.newPassword = "");
  data.newPasswordConfirm = !isEmpty(data.newPasswordConfirm)
    ? data.newPasswordConfirm
    : (data.newPasswordConfirm = "");

  if (Validator.isEmpty(data.currentPassword)) {
    errors.currentPassword = "Current password field is required";
  }

  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "New password field is required";
  }

  if (Validator.isEmpty(data.newPasswordConfirm)) {
    errors.newPasswordConfirm = "Confirm password field is required";
  }

  if (!Validator.equals(data.newPassword, data.newPasswordConfirm)) {
    errors.newPasswordConfirm = "Passwords must match";
    console.log("Passwords don'\t match");
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
