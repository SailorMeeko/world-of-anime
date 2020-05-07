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
            <h1>Join World of Anime</h1>
            <form onSubmit={e => onSubmit(e)}>
                <input 
                type="text" 
                placeholder="Username" 
                name="username" 
                value={username}
                onChange={e => onChange(e)}
                />

                <input 
                type="text" 
                placeholder="E-mail Address" 
                name="email" 
                value={email}
                onChange={e => onChange(e)}
                />
                
                <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={password}
                onChange={e => onChange(e)}
                />       
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