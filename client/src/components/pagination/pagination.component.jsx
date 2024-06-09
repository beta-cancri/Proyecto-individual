import React from 'react';
import './pagination.styles.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button className="btn-previous" onClick={handlePrevPage} disabled={currentPage === 1}></button>
      <span>{currentPage} of {totalPages}</span>
      <button className="btn-next" onClick={handleNextPage} disabled={currentPage === totalPages}></button>
    </div>
  );
};

export default Pagination;
