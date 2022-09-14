import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";


const Pagination = ({ pageSize, currentPage, itemCount, onPageChange }) => {
    const pagesCount = Math.ceil(itemCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (
        <div>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {pages.map(page => (
                        <li
                            key={page}
                            className={currentPage === page ? "page-item active" : "page-item"}
                        >
                        <a className="page-link" onClick={() => onPageChange(page)}>
                            {page}
                        </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};


Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};


export default Pagination;