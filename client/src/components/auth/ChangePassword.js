import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changePassword } from "../../actions/profileActions";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      errors: {},
      success: false,
      profile: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      this.setState({ success: nextProps.profile.success });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ success: false });

    const passwordData = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      newPasswordConfirm: this.state.newPasswordConfirm
    };

    this.props.changePassword(passwordData);
  }

  render() {
    const { errors, success } = this.state;

    return (
      <div className="changePassword">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Change Password</h1>
              <p className="lead text-center" />
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Current Password"
                  type="password"
                  name="currentPassword"
                  value={this.state.currentPassword}
                  onChange={this.onChange}
                  error={errors.currentPassword}
                  info="Enter current password"
                />

                <TextFieldGroup
                  placeholder="New Password"
                  name="newPassword"
                  type="password"
                  value={this.state.newPassword}
                  onChange={this.onChange}
                  error={errors.newPassword}
                  info="Enter new password"
                />

                <TextFieldGroup
                  placeholder="Confirm New Password"
                  name="newPasswordConfirm"
                  type="password"
                  value={this.state.newPasswordConfirm}
                  onChange={this.onChange}
                  error={errors.newPasswordConfirm}
                  info="Confirm new password"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              {// TODO: Clear success message on form resubmission

              success ? (
                <div className="text-center mt-3 text-info">
                  Password changed successfully
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { changePassword }
)(ChangePassword);
