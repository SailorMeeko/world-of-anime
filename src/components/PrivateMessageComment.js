import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const PrivateMessageComment = ({ 
                comment: { _id, text, date, 
                    user: { username, 
                        avatar: { url_full }
                    } 
                }
            }) => {
    return (
        <div className="message-container-reply">
            <div className="message-content-container-reply">
                <div>
                    <Link to={`/profile/${username}`}>
                        <img className="post-profile-pic" src={url_full} alt={username} />
                    </Link>
                </div>
                <div className="message-content">
                    {text}
                </div>
            </div>

            <div className="message-byline">
                Written by {username} on <Moment format='MMMM Do, YYYY hh:mm A'>{date}</Moment>
            </div>
        </div>
    );
}

PrivateMessageComment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default connect(null)(PrivateMessageComment);