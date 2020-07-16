import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { forgotPassword } from '../actions/auth';
import Layout from './layout/Layout';

const ForgotPassword = ({ forgotPassword, 
                          auth: { isAuthenticated, loading },
                           }) => {
    const [formData, setFormData] = useState({
        email: '',
        submitted: false
    });

    useEffect(() => {
        setFormData({ email: '', submitted: false });
    }, [isAuthenticated]);

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        setFormData({...formData, submitted: true});
        e.preventDefault();
        const forgotPasswordPromise = forgotPassword(email);

        forgotPasswordPromise.then((loginState) => {
            setFormData({...formData, submitted: false});
        });
    };

    const ForgotPassword = (
        <Layout>
            <h1>Forgot Password</h1>
            <p>Enter your e-mail address</p>
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
            <button disabled={formData.submitted} className="btn btn-primary" onClick={onSubmit}>Send Password Reset Link</button>
            </form>
        </Layout>
    )

    return (
        <Fragment>
            { !loading && (
                <Fragment>
                {isAuthenticated ? (<Redirect to={`/`} />) : (<Fragment>
                        {ForgotPassword}
                    </Fragment>)}
                </Fragment>
            ) }
        </Fragment>
    )
    
};

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);