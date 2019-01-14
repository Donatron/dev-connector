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
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const passwordData = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      newPasswordConfirm: this.state.newPasswordConfirm
    };

    this.props.changePassword(passwordData);
  }

  render() {
    const { errors } = this.state;

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
                <p>{this.state.errors.currentPassword}</p>

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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { changePassword }
)(ChangePassword);
