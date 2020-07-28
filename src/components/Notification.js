import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const reactStringReplace = require('react-string-replace');

const Notification = ({ auth: { user, loading }, 
                notification: { id, create_date, msg, notification_type },
                label
            }) => {

            msg = reactStringReplace(msg, 'p:profile', (match, i) => (
                <Link key={`${id}-profile`} to={`/profile/${user.username}`}>profile</Link>
            ));

            msg = reactStringReplace(msg, 'fr:', (match, i) => (
                <Link key={`${id}-friend_request`} to={`/friend_requests`}>friend request</Link>
            ));              

            msg = reactStringReplace(msg, /u:(\w+)/, (match, i) => (
                <Link key={`${id}-user`} to={`/profile/${match}`}>{match}</Link>
            ));

            msg = reactStringReplace(msg, /pc:(\S+)/, (match, i) => {
                const tokens = match.split(':');
                return (
                <Link key={`${id}-comment`} to={`/profile/${tokens[0]}/thread/${tokens[1]}`}>comment</Link>
                )
            });

            msg = reactStringReplace(msg, /pr:(\S+)/, (match, i) => {
                const tokens = match.split(':');
                return (
                <Link key={`${id}-comment`} to={`/profile/${tokens[0]}/thread/${tokens[1]}`}>reply</Link>
                )
            });                

            msg = reactStringReplace(msg, /pm:(\S+)/, (match, i) => {
                const tokens = match.split(':');
                return (
                <Link key={`${id}-comment`} to={`/pm/${tokens[0]}`}>private message</Link>
                )
            });            
            
    return (
        <Fragment>
            {label && <div>{label}</div>}
            <div className='notification'>
                <div className='notification-text'>{msg}</div>
                <div className='notification-date'><Moment format='MMMM Do, YYYY hh:mm A'>{create_date}</Moment></div>
            </div>
        </Fragment>
    );
}

Notification.propTypes = {
    auth: PropTypes.object,        
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Notification);
