import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;


    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);


      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '6px',
      marginTop: '30px',
      padding: '20px 0'
    }}>


      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: currentPage === 1 ? '#f0f0f0' : 'white',
          color: currentPage === 1 ? '#ccc' : '#333',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
        }}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          style={{
            padding: '8px 14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: page === currentPage ? '#007bff' : 'white',
            color: page === currentPage ? 'white' : '#333',
            cursor: page === '...' ? 'default' : 'pointer',
            fontWeight: page === currentPage ? 'bold' : 'normal'
          }}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}


      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 16px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: currentPage === totalPages ? '#f0f0f0' : 'white',
          color: currentPage === totalPages ? '#ccc' : '#333',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;