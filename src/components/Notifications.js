import database from '../config/firebase';
import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notification from './Notification';
import Layout from './layout/Layout';

const Notifications = ({ auth: { user } }) => {
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        async function getNotifications(user) {
            if (user) {
                let allNotifications = [];
                await database.ref(`users/${user._id}/notifications`)
                    .once('value')
                    .then((snapshot) => {
                        snapshot.forEach((childSnapshot) => {
                            allNotifications.push({
                                id: childSnapshot.key,
                                ...childSnapshot.val()
                            });                        
                        });
                    }
                );
                setNotifications(allNotifications);
            }
        }
        getNotifications(user);
    }, [user]);

    return (
        <Layout>
            <Fragment>
                {notifications && <div className="notification">
                    {notifications.map(notification => (
                        <Notification key={notification.id} notification={notification} />
                    ))}
                </div>}     
            </Fragment>
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