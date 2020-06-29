import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const reactStringReplace = require('react-string-replace');

const Notification = ({ auth: { user, loading }, 
                notification: { id, create_date, msg, notification_type }
            }) => {

            msg = reactStringReplace(msg, 'p:profile', (match, i) => (
                <Link key={`${id}-profile`} to={`/profile/${user.username}`}>profile</Link>
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
            
    return (
        <Fragment>
            <div>{msg}</div>
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
