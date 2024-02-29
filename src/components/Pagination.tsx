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
      <button disabled={current <= 1} onClick={previousPage}>
        {"<<"} anterior
      </button>
      {pageNumbers.map((pageNumber) => (
        <span
          className={`w-9 h-9 flex items-center justify-center border border-custom-violet rounded ${classNames(
            {}
          )}`}
          key={pageNumber}
        >
          {pageNumber}
        </span>
      ))}
      <button disabled={current >= total} onClick={nextPage}>
        próximo {">>"}{" "}
      </button>
    </div>
  );
}
