import React, {Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessage } from '../actions/message';
import Layout from './layout/Layout';
import Moment from 'react-moment';
import moment from 'moment';

const PrivateMessage = ({ match,
                getMessage,
                auth: { isAuthenticated, user, loading }
            }) => {

        const [message, setMessage] = useState(null);
        const [showSetupReplyButton, setShowSetupReplyButton] = useState(true)

        const [formData, setFormData] = useState({
            replyText: ''
        });            

        useEffect(() => {
            if (user) {
                const messagePromise = getMessage(match.params.id);
                messagePromise.then((message) => {
                    setMessage(message);
                });
            }
        }, [user]);

        let profilePicUrl = null;
        if (message && message.from?.avatar?.url_175) {
            profilePicUrl = message.from?.avatar?.url_175;
        } else if (message && message.from?.avatar?.url_full) {
            profilePicUrl = message.from?.avatar?.url_full;
        }

        const setupReply = async => {
            setShowSetupReplyButton(false);
        }
    
        const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
        const { replyText } = formData;
    
        const onSubmitNewReply = async e => {
            e.preventDefault();
        //   const newReplyPromise = createReplyToPost(formData, _id);
    
        //     newReplyPromise.then((post) => {
        //         // TODO - Send this to everyone on this thread
        //         setNotification(profile.user, `u:${post.newPost.comments[0].user.username} posted a pr:${profile.username}:${_id} to a comment on your p:profile`);
        //     });  
    
            setFormData({replyText:''});
            setShowSetupReplyButton(true);
        };        
           
    return (
        <Layout>
            {typeof message === 'undefined' && <Fragment>
                This is not your message.
            </Fragment>}
            {message && 
                <Fragment>
                <div className="message-container">
                    <div className="message-content-container">
                        <div>
                            <Link to={`/profile/${message.from.username}`}>
                                <img className="message-profile-pic" src={profilePicUrl} alt={`${message.from.username}'s profile picture`} />
                            </Link>
                        </div>
                            <div className="message-container">
                                {message.subject && <div className="message-subject">
                                        {message.subject}
                                    </div>}
                                <div className="message-content">
                                    {message.text}
                                </div>
                            </div>
                        </div>
    
                    <div className="message-byline">
                        Sent by {message.from.username} on <Moment format='MMMM Do, YYYY hh:mm A'>{message.date}</Moment>
                    </div>
                </div>
    
                {message.comments.length > 0 && 
                    <Fragment>
                        {message.comments.sort(
                            (a, b) =>
                            moment(a.date) - moment(b.date)
                           ).map(comment => (
                            <br />
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
    
                            <p><button className="post-container comment-button" onClick={e => onSubmitNewReply(e)}>Comment</button></p>
                        </form>
                    </div>}
    
                {isAuthenticated && showSetupReplyButton && <button className="post-container comment-button" key={message._id} onClick={e => setupReply(e)}>Comment on this private message</button>}

                
            </Fragment>        
            }
        </Layout>
    );
}

PrivateMessage.propTypes = {
    auth: PropTypes.object,        
};

const mapStateToProps = state => ({
    auth: state.auth,
    getMessage: PropTypes.func.isRequired
});

export default connect(mapStateToProps, { getMessage })(PrivateMessage);
