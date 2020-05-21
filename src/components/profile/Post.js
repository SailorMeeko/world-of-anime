import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Post = ({ post: { _id, text, date, user: { username, avatar: { url_full }} } }) => {
    return (
        <div className="post-container">
            <div className="post-content-container">
                <div>
                    <img className="post-profile-pic" src={url_full} alt={username} />
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

Post.propTypes = {
    post: PropTypes.object.isRequired,
}

export default Post;