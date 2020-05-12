import React, {Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getCurrentProfile, updateProfile } from '../../actions/profile';
import uploadFile from '../../utils/uploadFile';
import moment from 'moment';
import Spinner from '../layout/Spinner';
import Layout from '../layout/Layout';

const Profile = ({ auth: { user, loading }, getCurrentProfile, updateProfile, profile: { profile, error } }) => {
    let profilePicUrl = null;

    useEffect(() => {
        getCurrentProfile();
      }, [getCurrentProfile]);
    
      useEffect(() => {
        if (!loading && profile) {
            setFormData({
                name: profile.name,
                about_me: profile.about_me,
                birthday: moment.utc(profile.birthday).format('YYYY-MM-DD'),
                show_age: profile.show_age,
                favorite_anime: profile.favorite_anime,
                favorite_movies: profile.favorite_movies
            });
        }
      }, [loading, profile]);

    let history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        about_me: '',
        birthday: null,
        show_age: false,
        favorite_anime: '',
        favorite_movies: ''
    });

    const { name, about_me, birthday, show_age, favorite_anime, favorite_movies } = formData;

    const profilePicFileInput = React.createRef();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onCheck = e => setFormData({ ...formData, [e.target.name]: e.target.checked });

    const onSubmit = async e => {
        e.preventDefault();
        if (profilePicFileInput.current.files[0]) {
            profilePicUrl = await uploadFile(profilePicFileInput.current.files[0], `user/${user._id}/images`);
        }

        const loginPromise = updateProfile(formData, profilePicUrl);

        loginPromise.then((profileState) => {
            if (profileState.profileUpdated) {
                history.push(`/profile/${profile.username}`);
            }
        });
    };

    return (
        <Layout>
            {profile === null && error.status !== 401 ? <Spinner /> : <Fragment>
            {!loading && profile ? (
                <Fragment>
                <h1>Edit your profile</h1>
                    <form className="form" onSubmit={e => onSubmit(e)}>

                        <span className="form__label">Profile picture</span>
                        <input
                            type="file"
                            ref={profilePicFileInput}
                            accept="image/*"
                        />

                        <span className="form__label">Name</span>
                        <input 
                            type="text" 
                            name="name" 
                            value={name}
                            onChange={e => onChange(e)}
                        />

                        <span className="form__label">Birthday</span>
                        <input 
                        type="date" 
                        name="birthday" 
                        defaultValue={birthday}
                        onChange={e => onChange(e)}
                        />

                        <span className="form__label">Show my age</span>
                            <input 
                            type="checkbox" 
                            name="show_age" 
                            value={true}
                            checked={!!show_age}
                            onChange={e => onCheck(e)}
                            />

                        <span className="form__label">About me</span>
                        <textarea
                            name="about_me"
                            rows="8"
                            value={about_me}
                            onChange={e => onChange(e)
                            }
                        />

                        <span className="form__label">Favorite anime</span>
                        <textarea
                            name="favorite_anime"
                            rows="8"
                            value={favorite_anime}
                            onChange={e => onChange(e)
                            }
                        />
                        
                        <span className="form__label">Favorite movies</span>
                        <textarea
                            name="favorite_movies"
                            rows="8"
                            value={favorite_movies}
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