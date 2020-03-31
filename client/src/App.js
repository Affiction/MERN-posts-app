import '../node_modules/bulma/css/bulma.min.css';

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { getUser } from './actions';

// Components
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Posts from './components/posts/Posts';

// HOC
import PrivateRoute from './hocs/PrivateRoute';

// Utils
import { axiosHeaderToken } from './utils';

const token = localStorage.getItem('token');

if (token) {
  axiosHeaderToken(token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(getUser(), []);
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/posts" component={Posts} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
