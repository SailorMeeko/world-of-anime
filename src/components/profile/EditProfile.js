import React, {Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, updateProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Layout from '../layout/Layout';

const Profile = ({ auth: { user, loading }, getCurrentProfile, updateProfile, profile: { profile, error } }) => {
    useEffect(() => {
        getCurrentProfile();
      }, [getCurrentProfile]);
    
      useEffect(() => {
        if (!loading && profile) {
            setFormData({
                name: profile.name,
                about_me: profile.about_me
            });
        }
      }, [loading, profile]);

    const [formData, setFormData] = useState({
        name: '',
        about_me: ''
    });

    const { name, about_me } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        updateProfile(formData);
    };


    return (
        <Layout>
            {profile === null && error.status !== 401 ? <Spinner /> : <Fragment>
            {!loading && profile ? (
                <Fragment>
                <h1>Edit your profile</h1>
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <span className="form__label">Name</span>
                        <input 
                        type="text" 
                        name="name" 
                        value={name}
                        onChange={e => onChange(e)}
                        />

                        <span className="form__label">About me</span>
                        <textarea
                            name="about_me"
                            rows="8"
                            value={about_me}
                            onChange={e => onChange(e)
                            }
                        />
                        
                        <button onClick={e => onSubmit(e)}>Update Profile</button>
                    </form>
                </Fragment>) : (<Fragment>
                    You must be logged in to edit your profile.
                </Fragment>)}
            </Fragment>}
        </Layout>
    )
};

Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, updateProfile })(Profile);