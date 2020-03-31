import React, { Fragment, useState } from 'react';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleSubmit = e => {
    e.preventDefault();

    console.log(formData);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

export default Login;
