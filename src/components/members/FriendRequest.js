import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { acceptFriendRequest, rejectFriendRequest, updateNumFriendRequests } from '../../actions/friendship';
import { setNotification} from '../../actions/notification';

const FriendRequest = ({ auth: { user, loading }, 
                request: { _id,
                    requestDate, user1: { 
                        username, avatar: { 
                            url_avatar, url_full 
                        } 
                    } 
                },
                acceptFriendRequest,
                rejectFriendRequest,
                updateNumFriendRequests,
                setNotification
            }) => {
    const [showFriendRequest, setShowFriendRequest] = useState(true);     

    const avatar = (url_avatar) ? url_avatar : url_full;

    const onSubmitAcceptFriendRequest = async e => {
        e.preventDefault();
        const acceptRequest = acceptFriendRequest(_id);

        acceptRequest.then((friendship) => {
            setNotification(friendship.user1, `Great news, u:${user.username} has accepted your friend request!`);
            updateNumFriendRequests(friendship.user2);
        });

        setShowFriendRequest(false);
    };

    const onSubmitRejectFriendRequest = async e => {
        e.preventDefault();
        const rejectRequest = rejectFriendRequest(_id);

        rejectRequest.then((friendship) => {
            setNotification(friendship.user1, `Unfortunately u:${user.username} has rejected your friend request. Sorry about that.`);
            updateNumFriendRequests(friendship.user2);
        });

        setShowFriendRequest(false);
    };    

    return (
        <Fragment>
            {showFriendRequest &&
            <div className="friend-request-container">
                <div>
                    <Link to={`/profile/${username}`}>
                        <img className="friend-request-profile--pic" src={avatar} alt={username} />
                    </Link>
                </div>

                <div className="friend-request-content-container">
                    <div>
                        <Link to={`/profile/${username}`}>
                            {username}
                        </Link>
                    </div>

                    <div className="friend-request-button-container">
                        <button onClick={e => onSubmitAcceptFriendRequest(e)}>Accept</button>
                        <button onClick={e => onSubmitRejectFriendRequest(e)}>Reject</button>
                    </div>

                    <div>
                        Requested friendship on <Moment format='MMMM Do, YYYY hh:mm A'>{requestDate}</Moment>
                    </div>                    
                </div>

            </div>
            }
        </Fragment>
    );
}

FriendRequest.propTypes = {
    auth: PropTypes.object,        
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, 
    { acceptFriendRequest, 
      rejectFriendRequest, 
      updateNumFriendRequests,
      setNotification
    })(FriendRequest);
