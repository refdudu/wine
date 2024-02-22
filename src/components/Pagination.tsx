interface PaginationProps {
  current: number;
  total: number;
}

export function Pagination({ current, total }: PaginationProps) {
  const TOTAL_STEPS = 3 - 1;
  const pageNumbers = Array.from(
    { length: Math.min(total, 3) },
    (_, i) => i + Math.min(total - TOTAL_STEPS, current)
  );

  return (
    <div className="flex gap-2 text-custom-violet">
      {current > 1 && <span>...</span>}
      {pageNumbers.map((pageNumber) => (
        <span
          className="w-9 h-9 flex items-center justify-center border border-custom-violet rounded"
          key={pageNumber}
        >
          {pageNumber}
        </span>
      ))}
      {current < total && <span>próximo {">>"} </span>}
    </div>
  );
}
