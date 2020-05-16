import database from '../config/firebase';
import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from './layout/Layout';

const Notifications = ({ auth: { user } }) => {
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        async function getNotifications(user) {
            if (user) {
                const allNotifications = await database.ref(`users/${user._id}/notifications`).once('value').then((snapshot) => snapshot.val());
                console.log(allNotifications);
                setNotifications(allNotifications);
            }
        }
        getNotifications(user);
    }, [user]);

    return (
        <Layout>
            <span className="notificationCount">

            </span>
        </Layout>
    )
}

Notifications.propTypes = {
    auth: PropTypes.object,        
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Notifications);