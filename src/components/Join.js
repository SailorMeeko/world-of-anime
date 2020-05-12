import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { register } from '../actions/auth';
import Layout from './layout/Layout';

const Join = ({ isAuthenticated, register }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const {username, email, password} = formData;

    const onSubmit = async e => {
        e.preventDefault();
        register(formData);
    };

    if (isAuthenticated) {
        return <Redirect to='/' />
      }    

    return (
        <Layout>
            <p>So you've decided to join World of Anime? That's great! We're happy to have you! To join, just follow these very simple steps:</p>
            <ul>
                <li>Read and agree to the terms of service</li>
                <li>Choose a username and a password, and give us your e-mail address</li>
                <li>Click the "Sign me up" button.</li>
                <li>Have lots of fun!</li>
            </ul>

            <form onSubmit={e => onSubmit(e)}>
                <div className="form__element">
                    <label id="username-label" htmlFor="username">Username</label>
                    <input 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    value={username}
                    size="20"
                    maxLength="20"
                    autoFocus="autofocus"
                    autoCorrect="off"
                    onChange={e => onChange(e)}
                    />
                </div>

                <div className="form__element">
                    <label id="email-label" htmlFor="email">E-mail address</label>
                    <input 
                    type="email" 
                    placeholder="E-mail Address" 
                    name="email" 
                    value={email}
                    autoCorrect="off"
                    onChange={e => onChange(e)}
                />
                </div>
                
                <div className="form__element">
                    <label id="password-label" htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    value={password}
                    autoCorrect="off"
                    onChange={e => onChange(e)}
                    />
                </div>
                <button onClick={e => onSubmit(e)}>Sign me up!</button>
            </form>
        </Layout>
    )
};

Join.propTypes = {
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Join);