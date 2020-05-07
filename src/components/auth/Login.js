import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, auth: { isAuthenticated, loading } }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        setFormData({ email: '', password: '' });
    }, [isAuthenticated]);

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    const LoginForm = (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i>Sign Into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input 
                type="email" 
                placeholder="Email Address" 
                name="email" 
                value={email}
                onChange={e => onChange(e)}
                required
            />
            </div>
            <div className="form-group">
                <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
            </form>
        </Fragment>
    )

    return (
        <Fragment>
            { !loading && (
                <Fragment>
                {isAuthenticated ? (<Fragment>

                    </Fragment>) : (<Fragment>
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