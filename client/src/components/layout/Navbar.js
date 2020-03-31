import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions';

const Navbar = ({ auth: { isAuth, loading }, logout }) => {
  const loggedIn = (
    <Link to="/login" className="button is-info" onClick={logout}>
      Logout
    </Link>
  );

  const unAuthorized = (
    <Fragment>
      <Link to="/register" className="button is-primary">
        <strong>Sign up</strong>
      </Link>
      <Link to="/login" className="button is-light">
        Log in
      </Link>
    </Fragment>
  );

  const links = isAuth ? loggedIn : unAuthorized;

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      {/* BEGIN auth actions */}
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">{loading ? null : links}</div>
        </div>
      </div>
      {/* END auth actions */}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
