import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import profile from './profile';
import notification from './notification';
import post from './post';

export default combineReducers({
    auth,
    alert,
    profile,
    notification,
    post
});