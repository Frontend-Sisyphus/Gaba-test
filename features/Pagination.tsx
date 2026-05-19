import "@/styles/features/pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pages = getVisiblePages();

  return (
    <nav className="pagination" aria-label="Пагинация">
      <div className="pagination__info">
        Страница <span className="pagination__info-highlight">{currentPage}</span> из{' '}
        <span className="pagination__info-highlight">{totalPages}</span>
      </div>
      
      <div className="pagination__controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination__button ${currentPage === 1 ? "pagination__button--disabled" : ""}`}
        >
          ← Предыдущая
        </button>
        
        {pages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="pagination__button"
            >
              1
            </button>

            {pages[0] > 2 && <span className="pagination__ellipsis">…</span>}
          </>
        )}
        
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination__button ${
              page === currentPage
                ? "pagination__button--active"
                : ""
            }`}
          >
            {page}
          </button>
        ))}
        
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && <span className="pagination__ellipsis">…</span>}
            
            <button
              onClick={() => onPageChange(totalPages)}
              className="pagination__button"
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pagination__button ${currentPage === totalPages ? "pagination__button--disabled" : ""}`}
        >
          Следующая →
        </button>
      </div>
    </nav>
  );
}