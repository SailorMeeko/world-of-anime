import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteNotification } from '../actions/notification';
import Moment from 'react-moment';

const reactStringReplace = require('react-string-replace');

const Notification = ({ auth: { user, loading }, 
                notification: { _id, date, text, notification_type },
                deleteNotification,
                label
            }) => {
            const [showNotification, setShowNotification] = useState(true);       

            const onClickRemove = async (e) => {
                e.preventDefault();
                deleteNotification(_id);
                setShowNotification(false);
            }         

            text = reactStringReplace(text, 'p:profile', (match, i) => (
                <Link key={`${_id}-profile`} to={`/profile/${user.username}`}>profile</Link>
            ));

            text = reactStringReplace(text, 'fr:', (match, i) => (
                <Link key={`${_id}-friend_request`} to={`/friend_requests`}>friend request</Link>
            ));              

            text = reactStringReplace(text, /u:(\w+)/, (match, i) => (
                <Link key={`${_id}-user`} to={`/profile/${match}`}>{match}</Link>
            ));

            text = reactStringReplace(text, /pc:(\S+)/, (match, i) => {
                const tokens = match.split(':');
                return (
                <Link key={`${_id}-comment`} to={`/profile/${tokens[0]}/thread/${tokens[1]}`}>comment</Link>
                )
            });

            text = reactStringReplace(text, /pr:(\S+)/, (match, i) => {
                const tokens = match.split(':');
                return (
                <Link key={`${_id}-comment`} to={`/profile/${tokens[0]}/thread/${tokens[1]}`}>reply</Link>
                )
            });                

            text = reactStringReplace(text, /pm:(\S+)/, (match, i) => {
                const tokens = match.split(':');
                return (
                <Link key={`${_id}-comment`} to={`/pm/${tokens[0]}`}>private message</Link>
                )
            });            
            
    return (
        <Fragment>
            {label && <div className='notification-label'>{label}</div>}
            {showNotification &&
                <div className='notification'>
                    <div className='notification-text'>{text}</div>
                    <div>{<Moment format='MMMM Do YYYY hh:mm A'>{date}</Moment>}</div>
                    <div><button onClick={e => onClickRemove(e)}>X</button></div>
                </div>
            }
        </Fragment>
    );
}

Notification.propTypes = {
    auth: PropTypes.object,
    deleteNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteNotification })(Notification);
