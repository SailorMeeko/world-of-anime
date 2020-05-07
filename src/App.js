import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/styles.scss';
import Alert from './components/layout/Alert';
import Home from './components/Home';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import Join from './components/Join';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

if (cookies.get('token')) {
  setAuthToken(cookies.get('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Switch>

          <Route 
              exact={true}
              path="/"
              component = {Home} />

          <Route 
          exact={true}
          path="/profile"
          component = {EditProfile} />              

          <Route 
              exact={true}
              path="/profile/:username"
              component = {Profile} />
            
          <Route exact={true} path="/join" component={Join} />
          
          </Switch>          
        </Fragment>
      </Router>
    </Provider>
  )
}


export default App;
