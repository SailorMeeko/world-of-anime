import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/styles.scss';
import flags from './config/flags';
import Alert from './components/layout/Alert';
import Home from './components/Home';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import Notifications from './components/Notifications';
import PrivateMessages from './components/PrivateMessages';
import PrivateMessage from './components/PrivateMessage';
import FriendRequests from './components/members/FriendRequests';
import MemberSearch from './components/members/Search';
import Thread from './components/profile/Thread';
import Friends from './components/profile/Friends';
import Join from './components/Join';
import Login from './components/Login';
import Online from './components/Online';
import Support from './components/Support';
import Updates from './components/Updates';
import Newsletter from './components/Newsletter';
import ForgotPassword from './components/ForgotPassword';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

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

          {flags.socialSite && <Fragment>
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
            path="/pm"
            component = {PrivateMessages} />
            
            <Route
            exact={true}
            path="/pm/:id"
            component = {PrivateMessage} />          

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

            <Route
                exact={true}
                path="/profile/:username/friends"
                component = {Friends} />              
              
            <Route exact={true} path="/join" component={Join} />

            <Route 
            exact={true}
            path="/online"
            component = {Online} />

            <Route 
            exact={true}
            path="/login"
            component = {Login} />
  
            <Route
            exact={true}
            path="/login/forgot"
            component = {ForgotPassword} />
          </Fragment>}

          <Route
          exact={true}
          path="/support"
          component = {Support} />

          <Route
          exact={true}
          path="/updates"
          component = {Updates} />

          <Route
          exact={true}
          path="/newsletter"
          component = {Newsletter} />

          <Route 
          path="*" 
          component={Home} />
          
          </Switch>          
        </Fragment>
      </Router>
    </Provider>
  )
}


export default App;
