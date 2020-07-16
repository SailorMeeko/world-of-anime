import React, {Fragment, useState, useEffect} from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMessages } from '../actions/message';
import { Link } from 'react-router-dom';
import Layout from './layout/Layout';
import PageHeader from './widgets/PageHeader';

const PrivateMessages = ({ auth: { user },
                        getMessages }) => {
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        if (user) {
            const messagesPromise = getMessages();
            messagesPromise.then((messages) => {
                setMessages(messages);
            });
        }
    }, [user]);

    return (
        <Layout>
            <PageHeader>Private Messages</PageHeader>
            <Fragment>
            {messages && <Fragment>
                    <table className='private-messages'>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Subject</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                {messages.map(message => {
                        return <tr key={message._id}>
                            <td>{message.from.username}</td>
                            <td><Link to={`/pm/${message._id}`}>
                                    {message.subject}
                                </Link></td>
                            <td><Moment format='MMMM Do, YYYY hh:mm A'>{message.date}</Moment></td>
                        </tr>
                   }
                   )}
                    </tbody>
                    </table> 
                </Fragment>}
            </Fragment>
        </Layout>
    )
}

PrivateMessages.propTypes = {
    auth: PropTypes.object,
    getMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getMessages })(PrivateMessages);