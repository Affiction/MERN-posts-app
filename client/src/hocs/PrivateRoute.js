import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  auth: { isAuth, loading },
  ...args
}) => (
  <Route
    {...args}
    render={props => {
      const isAuthorized = !isAuth && !loading;

      if (isAuthorized) {
        return <Component {...props} />;
      }

      return <Redirect to="/login" />;
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
