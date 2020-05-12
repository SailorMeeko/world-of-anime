import React, { Fragment } from 'react';
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

                <main>
                    {props.children}
                </main>
            </div>
        </Fragment>
    )
};

export default Layout;