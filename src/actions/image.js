import api from '../config/axios';

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