import api from '../config/axios';

import {
    CREATE_IMAGE
} from './types';

// Get profile by username
export const createImage = (image) => async dispatch => {
    try {
        const formData = {
            url_full: image.url_full
        }

        const res = await api.post(`/api/image`, formData);

        if (res) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
    }
}