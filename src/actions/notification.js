import api from '../config/axios';

import database from '../config/firebase';
import {SET_NOTIFICATION} from './types';

export const setNotification = (user, text, type = 1) => async dispatch => {

    /* Notification types
        1 = comment

    */

    const currentCount = await database.ref(`users/${user}/unread_notification_count`).once('value').then((snapshot) => snapshot.val()) || 0;

    try {
        const formData = {user, text, type};
        await api.post(`/api/notification`, formData);

        database.ref(`users/${user}`).update({
                unread_notification_count: currentCount + 1
            }).then((ref) => {
                dispatch({
                    type: SET_NOTIFICATION,
                    payload: {
                        user,
                        text,
                        type
                    }
                });
            });

    } catch (error) {

    }
    // return database.ref(`users/${user}/notifications`).push({
    //     notification_type,
    //     msg,
    //     create_date: Date.now()
    // }).database.ref(`users/${user}`).update({
    //     unread_notification_count: currentCount + 1
    // }).then((ref) => {
    //     dispatch({
    //         type: SET_NOTIFICATION,
    //         payload: {
    //             msg,
    //             id: user
    //         }
    //     });
    // });
}

export const getNotifications = (page = 1) => async dispatch => {
    try {
        const res = await api.get(`/api/notification/get?page=${page}`);

        return res.data;
    } catch (error) {
    }
}

export const resetNotificationCount = (user) => async dispatch => {
    return database.ref(`users/${user}`).update({
        unread_notification_count: 0
    });
}

export const deleteNotification = (notificationId) => async dispatch => {
    try {
        await api.delete(`/api/notification/notification/${notificationId}`);
    } catch (error) {
    }
}

export const deleteNotifications = () => async dispatch => {
    try {
        await api.delete(`/api/notification/notifications`);
    } catch (error) {
    }
}