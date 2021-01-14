import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const ShoutMessage = ({ 
                comment: { id, name, shout, create_date} 
            }) => {
    
    return (
        <Fragment>
            <div className="post-container">
                <div className="post-content-container">
                    <div>
                        <Link to={`/`}>
                            <img className="post-profile-pic" />
                        </Link>
                    </div>
                    <div className="post-content">
                        {shout}
                    </div>
                </div>

                <div className="post-byline">
                    Posted by {name} on <Moment format='MMMM Do, YYYY hh:mm A'>{create_date}</Moment>
                </div>
            </div>

        </Fragment>        
    );
}

export default ShoutMessage;