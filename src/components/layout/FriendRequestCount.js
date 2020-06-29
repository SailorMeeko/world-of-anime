import database from '../../config/firebase';
import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FriendRequestCount = ({ auth: { user } }) => {
    const [friendRequestCount, setFriendRequestCount] = useState(-1);

    useEffect(() => {
        async function getFriendRequestCount(user) {
            if (user) {
                var currentCountRef = database.ref(`users/${user._id}/friend_requests`);
                currentCountRef.on('value', function(snapshot) {
                    if (!snapshot.val()) {
                        setFriendRequestCount(0);
                    } else {
                        setFriendRequestCount(snapshot.val());
                    }
                });
            }
        }
        getFriendRequestCount(user);
    }, [user]);

    return (
        <Fragment>
            <span className="friendRequestCount">
                {friendRequestCount >= 0 && friendRequestCount} Friend Requests
            </span>
        </Fragment>
    )
}

FriendRequestCount.propTypes = {
    auth: PropTypes.object,        
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(FriendRequestCount);