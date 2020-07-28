import React, {useState,Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchForMembers } from '../../actions/profile';
import ProfileBasic from '../profile/ProfileBasic';
import Layout from '../layout/Layout';

const MemberSearch = ({ searchForMembers }) => {    
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        about_me: '',
        favorite_anime: '',
        favorite_movies: ''
    });

    const [results, setResults] = useState('');

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const {username, name, favorite_anime, favorite_movies} = formData;

    const onSubmit = async e => {
        e.preventDefault();
        const res = await searchForMembers(formData);
        setResults(res);
    };

    return (
        <Layout>
            
            <form onSubmit={e => onSubmit(e)}>
                <div className="form__element">
                    <label id="username-label" htmlFor="username">Username</label>
                    <input 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    value={username}
                    autoFocus="autofocus"
                    autoCorrect="off"
                    onChange={e => onChange(e)}
                    />
                </div>

                <div className="form__element">
                    <label id="name-label" htmlFor="name">Real name</label>
                    <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    value={name}
                    autoCorrect="off"
                    onChange={e => onChange(e)}
                />
                </div>
                
                <div className="form__element">
                    <label id="favorite_anime-label" htmlFor="favorite_anime">Favorite anime</label>
                    <input 
                    type="text" 
                    placeholder="Favorite anime" 
                    name="favorite_anime" 
                    value={favorite_anime}
                    autoCorrect="off"
                    onChange={e => onChange(e)}
                    />
                </div>

                <div className="form__element">
                    <label id="favorite_movies-label" htmlFor="favorite_movies">Favorite movies</label>
                    <input 
                    type="text" 
                    placeholder="Favorite movies" 
                    name="favorite_movies" 
                    value={favorite_movies}
                    autoCorrect="off"
                    onChange={e => onChange(e)}
                    />
                </div>
                <button onClick={e => onSubmit(e)}>Search for members</button>
            </form>
            {results.length > 0 && <Fragment>
                {results.map(user => (
                    <ProfileBasic key={user._id} username={user.username} profile_pic={user.profile_pic} />
                ))}
                </Fragment>}
        </Layout>
    )
};

MemberSearch.propTypes = {
    searchForMembers: PropTypes.func.isRequired
}

export default connect(null, {searchForMembers})(MemberSearch);