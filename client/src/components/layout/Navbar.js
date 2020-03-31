import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      {/* BEGIN auth actions */}
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/register" className="button is-primary">
              <strong>Sign up</strong>
            </Link>
            <Link to="/login" className="button is-light">
              Log in
            </Link>
          </div>
        </div>
      </div>
      {/* END auth actions */}
    </nav>
  );
};

export default Navbar;
