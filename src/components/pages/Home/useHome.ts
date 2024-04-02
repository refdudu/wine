import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export const useHome = () => {
  const searchParams = useSearchParams();
  const { push, query } = useRouter();

  const pageIndex = searchParams.get("pageIndex")
    ? Number(searchParams.get("pageIndex"))
    : 1;
  const betweenPrices = searchParams.get("betweenPrices") || "";
  const searchText = searchParams.get("searchText") || "";
  function setPageIndex(pageIndex: string | number) {
    push(
      {
        query: { ...query, pageIndex },
      },
      undefined,
      { shallow: true }
    );
  }
  function handleFilterBetweenPrices(betweenPrices?: string) {
    push(
      {
        query: { searchText, betweenPrices, pageIndex: 1 },
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }
  function handleFilterSearch(searchText: string) {
    push(
      {
        query: {
          betweenPrices,
          searchText,
          pageIndex: 1,
        },
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }
  return {
    setPageIndex,
    handleFilterBetweenPrices,
    handleFilterSearch,
    betweenPrices,
    pageIndex,
    searchText,
  };
};
