const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePasswordChange(data) {
  let errors = {};

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
  }

  console.log(`Current Password: ${errors.currentPassword}`);
  console.log(`New Password: ${errors.newPassword}`);
  console.log(`Confirm New Password: ${errors.newPasswordConfirm}`);

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
