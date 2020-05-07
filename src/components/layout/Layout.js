import React, { Fragment } from 'react';
import Login from '../auth/Login';
import Header from './Header';

const Layout = (props) => {
    return (
        <Fragment>
            <Header />
            <div className='container'>
                <img 
                    className='container--img'
                    src='/images/classic-header.jpg'
                    alt='World of Anime' 
                />

                <div>
                    {props.children}
                </div>

                <Login />
            </div>
        </Fragment>
    )
};

export default Layout;