import React from 'react';
import './style.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePages = () => {
    const pages = [];

    pages.push(1);

    if (currentPage < 3) {
      for (let i = 2; i <= Math.min(3, totalPages - 1); i++) {
        pages.push(i);
      }

      if (totalPages > 4) {
        pages.push('...');
        pages.push(totalPages);
      }
    } else if (currentPage === 3) {
      for (let i = 2; i <= Math.min(4, totalPages - 1); i++) {
        pages.push(i);
      }

      if (totalPages > 4) {
        pages.push('...');
        pages.push(totalPages);
      }
    } else if (currentPage > 3 && currentPage <= totalPages - 3) {
      pages.push('...');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    } else {
      pages.push('...');
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      {generatePages().map((page, index) =>
        page === '...' ? (
          <span key={index} className="dots">
            {page}
          </span>
        ) : (
          <button
            key={index}
            className={currentPage === page ? 'active' : ''}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}
    </div>
  );
};

export default Pagination;
