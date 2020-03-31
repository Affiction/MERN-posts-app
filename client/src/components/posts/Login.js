import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../actions';

export const Login = ({ login, isAuthorized }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthorized) {
    return <Redirect to="/posts" />;
  }

  return (
    <Fragment>
      <h1 className="title has-text-centered">Login</h1>

      <div className="columns is-mobile is-centered">
        <div className="column is-half">
          <form onSubmit={e => handleSubmit(e)}>
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
                />
              </div>
            </div>
            {/* END password */}

            {/*BEGIN submit */}
            <div className="field is-grouped is-grouped-right">
              <p className="control">
                <button type="submit" className="button is-success is-medium">
                  Login
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthorized: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(Login);
