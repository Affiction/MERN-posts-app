import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register, setAlert } from '../../actions';

export const Register = ({ setAlert, register, isAuthorized }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  const isPasswordsMath = password !== confirmPassword;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isPasswordsMath) {
      return setAlert("Password don't match", 'is-danger');
    }

    register({ name, email, password });
  };

  if (isAuthorized) {
    return <Redirect to="/posts" />;
  }

  return (
    <Fragment>
      <h1 className="title has-text-centered">Register</h1>

      <div className="columns is-mobile is-centered">
        <div className="column is-half">
          <form onSubmit={e => handleSubmit(e)}>
            {/* BEGIN name */}
            <div className="field">
              <label className="label" htmlFor="name">
                Name
              </label>

              <div className="control">
                <input
                  id="name"
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => handleChange(e)}
                  required
                />
              </div>
            </div>
            {/* END name */}

            {/* BEGIN email */}
            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>

              <div className="control">
                <input
                  id="email"
                  className="input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => handleChange(e)}
                  required
                />
              </div>
            </div>
            {/* END email */}

            {/* BEGIN password */}
            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>

              <div className="control">
                <input
                  id="password"
                  className="input"
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => handleChange(e)}
                  required
                  minLength="6"
                />
              </div>
            </div>
            {/* END password */}

            {/* BEGIN confirm password */}
            <div className="field">
              <label className="label" htmlFor="confirmPassword">
                Confirm password
              </label>
              <div className="control">
                <input
                  id="confirmPassword"
                  className="input"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => handleChange(e)}
                  required
                  minLength="6"
                />
              </div>
            </div>
            {/* END confirm password */}

            {/*BEGIN submit */}
            <div className="field is-grouped is-grouped-right">
              <p className="control">
                <button type="submit" className="button is-success is-medium">
                  Register
                </button>
              </p>
            </div>
            {/*END submit */}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthorized: state.auth.isAuth
});

export default connect(mapStateToProps, { setAlert, register })(Register);
