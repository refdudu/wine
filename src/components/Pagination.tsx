import classNames from "classnames";
import { useMemo } from "react";

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
  const TOTAL_STEPS = Math.min(total, 3);
  const pageNumbers = useMemo(() => {
    return Array.from({ length: TOTAL_STEPS }, (_, i) => {
      const number = i + current;
      if (current <= 1) return number;
      if (current === total) return number - TOTAL_STEPS + 1;
      return number - 1;
    });
  }, [current, total, TOTAL_STEPS]);

  function nextPage() {
    changePageIndex(current + 1);
  }
  function previousPage() {
    changePageIndex(current - 1);
  }
  return (
    <div className="flex gap-2 text-custom-violet items-center">
      <div className="w-20">
        {current > 1 && (
          <button disabled={current <= 1} onClick={previousPage}>
            {"<<"} anterior
          </button>
        )}
      </div>
      {pageNumbers.map((pageNumber, index) => (
        <span
          className={`h-9 flex items-center justify-center border border-custom-violet rounded ${classNames(
            {
              "text-white": pageNumber === current,
              "bg-custom-violet": pageNumber === current,
              "w-20": index === 1,
              "w-9": index !== 1,
            }
          )}`}
          key={pageNumber}
        >
          {pageNumber}
        </span>
      ))}
      <div className="w-20">
        {current < total && (
          <button disabled={current >= total} onClick={nextPage}>
            próximo {">>"}{" "}
          </button>
        )}
      </div>
    </div>
  );
}
