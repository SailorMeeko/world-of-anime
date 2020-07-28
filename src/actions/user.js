import api from '../config/axios';

// Retrieve new members
export const getNewMembers = () => async dispatch => {
    try {
        console.log('Getting new members');
        const res = await api.get(`/api/users/recent`);

        return res.data;
    } catch (error) {

    }
}

// Update last_online time
export const updateLastOnline = () => async dispatch => {
    try {
        api.get(`/api/users/last_online`);
    } catch (error) {
    }
}

// Get who is online
export const getOnlineMembers = () => async dispatch => {
    console.log('Checking who is online');
    try {
        const res = await api.get(`/api/users/online`);

        return res.data;
    } catch (error) {
    }
}