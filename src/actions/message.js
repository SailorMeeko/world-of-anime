import api from '../config/axios';

// Create new message to a user
export const createMessageToUser = (formData, to) => async dispatch => {
    try {
        formData = {...formData, to};
        const res = await api.post(`/api/message`, formData);
 
        return { messageId: res.data._id };
    } catch (error) {
    }
}

// Get private messages for a user
export const getMessages = () => async dispatch => {
    try {
        const res = await api.get(`/api/message`);
        
        return res.data;
    } catch (error) {

    }
}

// Get a single private message
export const getMessage = (messageId) => async dispatch => {
    try {
        const res = await api.get(`/api/message/single/${messageId}`);

        if (!res) {
            return { error: 'This is not your message' }
        }
        
        return res.data;
    } catch (error) {

    }
}