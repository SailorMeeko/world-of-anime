import React from 'react';

const PageHeader = (props) => {
    return (
        <div className='page-heading'>
            {props.children}
        </div>
    )
};

export default PageHeader;