import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/styles.scss';
import Alert from './components/layout/Alert';
import Home from './components/Home';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import Notifications from './components/Notifications';
import FriendRequests from './components/members/FriendRequests';
import MemberSearch from './components/members/Search';
import Thread from './components/profile/Thread';
import Join from './components/Join';
import Login from './components/Login';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

// if (cookies.get('token')) {
//   setAuthToken(cookies.get('token'));
// }

if (localStorage.token) {
  setAuthToken(localStorage.token);
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
          path="/notifications"
          component = {Notifications} />

          <Route
          exact={true}
          path="/friend_requests"
          component = {FriendRequests} />

          <Route 
          exact={true}
          path="/members/search"
          component = {MemberSearch} />                             

          <Route 
              exact={true}
              path="/profile/:username"
              component = {Profile} />

          <Route
              exact={true}
              path="/profile/:username/thread/:id"
              component = {Thread} />
            
          <Route exact={true} path="/join" component={Join} />

          <Route 
          exact={true}
          path="/login"
          component = {Login} />              
          
          </Switch>          
        </Fragment>
      </Router>
    </Provider>
  )
}


export default App;
