import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const PostComment = ({ 
                comment: { _id, text, date, 
                    user: { username, 
                        avatar: { url_full }
                    } 
                }
            }) => {
    return (
        <div className="post-container-reply">
            <div className="post-content-container-reply">
                <div>
                    <Link to={`/profile/${username}`}>
                        <img className="post-profile-pic" src={url_full} alt={username} />
                    </Link>
                </div>
                <div className="post-content">
                    {text}
                </div>
            </div>

            <div className="post-byline">
                Posted by {username} on <Moment format='MMMM Do, YYYY hh:mm A'>{date}</Moment>
            </div>
        </div>
    );
}

PostComment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default connect(null)(PostComment);