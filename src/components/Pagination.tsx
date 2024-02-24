interface PaginationProps {
  current: number;
  total: number;
  changePageIndex: (page: number) => void;
}

export function Pagination({
  current,
  total,
  changePageIndex,
}: PaginationProps) {
  const TOTAL_STEPS = 3 - 1;
  const pageNumbers = Array.from(
    { length: Math.min(total, 3) },
    (_, i) => i + Math.min(total - TOTAL_STEPS, current)
  );
  function nextPage() {
    changePageIndex(current + 1);
  }
  function previousPage() {
    changePageIndex(current - 1);
  }
  return (
    <div className="flex gap-2 text-custom-violet">
      {current > 0 && <span onClick={previousPage}>{"<<"} anterior</span>}
      {pageNumbers.map((pageNumber) => (
        <span
          className="w-9 h-9 flex items-center justify-center border border-custom-violet rounded"
          key={pageNumber}
        >
          {pageNumber}
        </span>
      ))}
      {current < total - 1 && <span onClick={nextPage}>próximo {">>"} </span>}
    </div>
  );
}
