import { api } from "@/utils/api";

import { useSearchParams } from "next/navigation";
import { GetProductsResponse } from "@/api/product/ProductService";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { GetStaticProps } from "next";
import { SideBar } from "@/components/Sidebar";
import { Layout } from "@/components/Layout";
import { ProductsGrid } from "@/components/ProductsGrid";

interface StaticProps {
  initialData: GetProductsResponse;
}

export default function Home({}: StaticProps) {
  const searchParams = useSearchParams();

  const { push, query } = useRouter();
  const pageIndex = searchParams.get("pageIndex")
    ? Number(searchParams.get("pageIndex"))
    : 1;
  const betweenPrices = searchParams.get("betweenPrices") || "";
  const searchText = searchParams.get("searchText") || "";

  const {
    data: productsResponse,
    isLoading,
    isFetching,
  } = useQuery<GetProductsResponse>({
    queryFn: async () => {
      //   const isMobile = document.body.clientWidth <= 1024;
      const params = {
        pageIndex: pageIndex - 1,
        pageSize: 9,
        betweenPrices,
        searchText,
      };
      const { data } = await api.get<GetProductsResponse>("products", {
        params,
      });
      return data;
    },
    queryKey: ["products", { pageIndex, betweenPrices, searchText }],
    staleTime: 1000 * 60 * 60,
    keepPreviousData: true,
    // initialData: {} as GetProductsResponse,
  });

  function setPageIndex(pageIndex: string | number) {
    push(
      {
        query: {
          ...query,
          pageIndex,
        },
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
      { shallow: true }
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
      { shallow: true }
    );
  }

  return (
    <Layout>
      <div className="max-w-[1120px] w-full my-10 flex justify-between mx-auto px-3">
        <SideBar
          betweenPrices={betweenPrices}
          changeBetweenPrice={handleFilterBetweenPrices}
        />
        {productsResponse && (
          <ProductsGrid
            {...{
              pageIndex,
              productsResponse,
              setPageIndex,
              handleFilterSearch,
              searchText,
            }}
          />
        )}
      </div>
    </Layout>
  );
}

export const getStatic: GetStaticProps<StaticProps> = async () => {
  return {
    props: {
      initialData: {} as GetProductsResponse,
    },
    revalidate: false,
  };
};
