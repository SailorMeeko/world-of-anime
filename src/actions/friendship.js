import api from '../config/axios';
import database from '../config/firebase';

import {
    SEND_FRIEND_REQUEST,
    SET_FRIEND_REQUESTS
} from './types';

export const updateNumFriendRequests = user => async dispatch => {
    // Get number from API
    const res = await api.get(`/api/friendship/num_requests/${user}`);

    // Update number in Firebase database

    return database.ref(`users/${user}`).update({
        friend_requests: res.data
    });    

}

// Send friend request
export const sendFriendRequest = user => async dispatch => {
    try {

        const res = await api.get(`/api/friendship/request/${user}`);

        // dispatch({
        //     type: SEND_FRIEND_REQUEST,
        //     payload: res.data
        // });

    } catch (error) {
        // dispatch({
        //     type: PROFILE_ERROR,
        //     payload: { msg: error }
        // });
    }
}

// Get friend requests
export const getFriendRequests = user => async dispatch => {
    try {
        const res = await api.get('/api/friendship/requests');
        return { requests: res.data };

        // dispatch({
        //     type: SET_FRIEND_REQUESTS,
        //     payload: res.data
        // });

    } catch (error) {

    }
}

// Get friendship status
export const getFriendshipStatus = (user1, user2) => async dispatch => {
    try {
        console.log('Looking up friendship status of ', user1, ' and ', user2);
        const res = await api.get(`/api/friendship/status/${user1}/${user2}`);
        console.log('Returning ', res.data);
        return { status: res.data }

    } catch (error) {

    }
}
