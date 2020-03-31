import '../node_modules/bulma/css/bulma.min.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Components
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <div className="notification">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
