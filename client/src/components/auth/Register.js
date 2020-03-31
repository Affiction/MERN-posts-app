import React, { Fragment, useState } from 'react';

export const Register = () => {
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
      return;
    }

    console.log(formData);
  };

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
                />
              </div>
              {isPasswordsMath ? (
                <p className="help is-danger">Passwords not match!</p>
              ) : null}
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

export default Register;
