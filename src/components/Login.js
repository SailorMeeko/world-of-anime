import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { login } from '../actions/auth';
import Layout from './layout/Layout';

const Login = ({ login, auth: { isAuthenticated, loading } }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        submitted: false
    });

    useEffect(() => {
        setFormData({ email: '', password: '', submitted: false });
    }, [isAuthenticated]);

    let history = useHistory();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        setFormData({...formData, submitted: true});
        e.preventDefault();
        const loginPromise = login(email, password);

        loginPromise.then((loginState) => {
            if (!loginState.loggedIn) {
                setFormData({...formData, submitted: false});
            }

            if (loginState.loggedIn) {
                history.goBack();
            }    
        });
    };

    const LoginForm = (
        <Layout>
            <h1>Sign In</h1>
            <p>Sign Into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>

            <div className="form__element">
                <label id="email-label" htmlFor="email">Email</label>
                <input 
                type="email" 
                placeholder="Email Address" 
                name="email" 
                value={email}
                onChange={e => onChange(e)}
                required
            />
            </div>
            <div className="form__element">
                <label id="password-label" htmlFor="password">Password</label>
                <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                />
            </div>
            <button disabled={formData.submitted} className="btn btn-primary" onClick={onSubmit}>Login</button>
            </form>

            <Link to='/login/forgot'>
                Forgot password?
            </Link>
        </Layout>
    )

    return (
        <Fragment>
            { !loading && (
                <Fragment>
                {isAuthenticated ? (<Redirect to={`/`} />) : (<Fragment>
                        {LoginForm}
                    </Fragment>)}
                </Fragment>
            ) }
        </Fragment>
    )
    
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(Login);