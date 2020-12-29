import React, { Fragment } from 'react';
import flags from '../../config/flags';
import { Link } from 'react-router-dom';
import Header from './Header';

const Layout = (props) => {
    return (
        <Fragment>
            <Header />
            <div className='container'>
                {flags.socialSite &&
                    <Link to='/'>
                        <img 
                            className='container--img'
                            src='/images/classic-header.jpg'
                            alt='World of Anime' 
                        />
                    </Link>
                }

                <main>
                    {props.children}
                </main>
            </div>

            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <ins class="adsbygoogle"
                
                data-ad-client="ca-pub-2012337006268482"
                data-ad-slot="8720087548"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        </Fragment>
    )
};

export default Layout;