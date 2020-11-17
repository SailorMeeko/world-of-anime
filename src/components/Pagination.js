import React, {Fragment} from 'react';

const Pagination = ( { currentPage, totalPages, onClickHandler }) => {
    let pages = [];
    for (let x = 1; x <= totalPages; x++) {
        pages.push(x);
    }

    return (
        <Fragment>
            {pages.map((value, index) => {
                return (currentPage === value) ?
                    <Fragment key={index}>
                        {value}
                    </Fragment>
                : <Fragment key={index}>
                    <button onClick={e => onClickHandler(e, value)}>{value}</button>
                </Fragment>
            })}
        </Fragment>
    )
};

export default Pagination;