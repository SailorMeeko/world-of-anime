import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Layout = (props) => {
    return (
        <Fragment>
            <Header />
            <div className='container'>
                <Link to='/'>
                    <img 
                        className='container--img'
                        src='/images/classic-header.jpg'
                        alt='World of Anime' 
                    />
                </Link>

                <main>
                    {props.children}
                </main>
            </div>
        </Fragment>
    )
};

export default Layout;