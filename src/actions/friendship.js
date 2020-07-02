import api from '../config/axios';
import database from '../config/firebase';

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
        await api.get(`/api/friendship/request/${user}`);
    } catch (error) {
    }
}

// Get friend requests
export const getFriendRequests = user => async dispatch => {
    try {
        const res = await api.get('/api/friendship/requests');
        return { requests: res.data };
    } catch (error) {
    }
}

// Get friendship status
export const getFriendshipStatus = (user1, user2) => async dispatch => {
    try {
        const res = await api.get(`/api/friendship/status/${user1}/${user2}`);
        return { status: res.data }
    } catch (error) {
    }
}

// Accept friend request
export const acceptFriendRequest = requestId => async dispatch => {
    try {
        const res = await api.get(`/api/friendship/request/${requestId}/accept`);
        return res.data;
    } catch (error) {
    }
}

// Reject friend request
export const rejectFriendRequest = requestId => async dispatch => {
    try {
        const res = await api.get(`/api/friendship/request/${requestId}/reject`);
        return res.data;
    } catch (error) {
    }
}

// Get user friends
export const getUserFriends = userId => async dispatch => {
    try {
        const res = await api.get(`/api/friendship/friends/${userId}`);
        return res.data;
    } catch (error) {
    }
}