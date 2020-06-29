import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createReplyToPost } from '../../actions/post';
import { setNotification} from '../../actions/notification';
import PostComment from './PostComment';
import Moment from 'react-moment';
import moment from 'moment';

const Post = ({ 
                post: { _id, text, date, comments, 
                    user: { username, 
                        avatar: { url_full }
                    } 
                },
                profile,
                createReplyToPost,
                setNotification
            }) => {
    const [showSetupReplyButton, setShowSetupReplyButton] = useState(true)

    const [formData, setFormData] = useState({
        replyText: ''
    });    

    const setupReply = async => {
        setShowSetupReplyButton(false);
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const { replyText } = formData;

    const onSubmitNewReply = async e => {
        e.preventDefault();
        const newReplyPromise = createReplyToPost(formData, _id);

        newReplyPromise.then((newPost) => {
            // TODO - Send this to everyone on this thread
            setNotification(profile.user, `u:${username} posted a pr:${profile.username}:${_id} to a comment on your p:profile`);
        });

        setFormData({replyText:''});
        setShowSetupReplyButton(true);
    };
    
    return (
        <Fragment>
            <div className="post-container">
                <div className="post-content-container">
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

            {comments.length > 0 && 
                <Fragment>
                    {comments.sort(
                        (a, b) =>
                        moment(a.date) - moment(b.date)
                       ).map(comment => (
                        <PostComment key={comment._id} comment={comment} />
                    ))}
            </Fragment>}     

            {!showSetupReplyButton && 
                <div className="profile-action-box">
                    <form>
                        <textarea
                            name="replyText"
                            rows="4"
                            value={replyText}
                            onChange={e => onChange(e)}
                        />

                        <p><button className="post-container comment-button" onClick={e => onSubmitNewReply(e)}>Reply</button></p>
                    </form>
                </div>}

            {showSetupReplyButton && <button className="post-container comment-button" key={_id} onClick={e => setupReply(e)}>Post a reply</button>}

        </Fragment>        
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    createReplyToPost: PropTypes.func.isRequired
}

export default connect(null, { createReplyToPost, setNotification })(Post);