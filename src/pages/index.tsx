/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import { XIcon } from "@/utils/icons";
import { ProductCard } from "@/components/pages/Home/ProductCard";
import { Header } from "@/components/Header";
import { api } from "@/utils/api";
import { Pagination } from "@/components/Pagination";

import { GetProductsFilter } from "@/api/product/ProductRepository";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { GetProductsResponse } from "@/api/product/ProductService";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GetServerSideProps } from "next";
import { BetweenPriceFilter } from "@/components/BetweenPriceFilter";

export default function Home({}: { initialData: GetProductsResponse }) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const { push, query } = useRouter();
  const pageIndex = searchParams.get("pageIndex")
    ? Number(searchParams.get("pageIndex"))
    : 1;
  const betweenPrices = searchParams.get("betweenPrices") || "";

  const {
    data: productsResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      const { data } = await api.get<GetProductsResponse>("products", {
        params: {
          pageIndex: pageIndex - 1,
          pageSize: 9,
          betweenPrices,
        },
      });
      return data;
    },
    queryKey: ["products", { pageIndex, betweenPrices }],
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
        query: {
          betweenPrices,
          pageIndex: 1,
        },
      },
      undefined,
      { shallow: true }
    );
  }

  return (
    <div className="">
      <Header />
      <div className="max-w-[1120px] w-full m-auto my-10 flex justify-between">
        <SideBar
          betweenPrices={betweenPrices}
          changeBetweenPrice={handleFilterBetweenPrices}
        />

        {productsResponse && (
          <main className="flex-1">
            <span onClick={() => {}}>
              <b>{productsResponse.total}</b> produtos encontrados
            </span>

            <div className="grid-products my-6">
              {productsResponse.products.map((product) => (
                <ProductCard
                  key={product.name}
                  {...{ product }}
                  onAdd={() => {}}
                />
              ))}
            </div>
            <div className="flex justify-center ">
              <Pagination
                current={pageIndex}
                changePageIndex={setPageIndex}
                total={Math.ceil(
                  productsResponse.total / productsResponse.pageSize
                )}
              />
            </div>
          </main>
        )}
      </div>
      <ReactQueryDevtools />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
interface SideBarProps {
  betweenPrices: string | null;
  changeBetweenPrice: (betweenPrice?: string) => void;
}
function SideBar({ betweenPrices, changeBetweenPrice }: SideBarProps) {
  return (
    <aside className="font-neo w-64">
      <div className="font-extrabold">
        <h3 className="text-xl">Refine sua busca</h3>
        <div className="flex gap-8 items-end">
          <h4 className="text-lg mt-8 text-custom-subtitle">Por preço</h4>
          {betweenPrices && (
            <div
              className="flex items-center gap-1 font-normal cursor-pointer"
              onClick={() => changeBetweenPrice(undefined)}
            >
              <Image alt="X" src={XIcon} width={16} height={16} />
              <span data-cy="clear-between-prices-filter">Limpar</span>
            </div>
          )}
        </div>
      </div>
      <BetweenPriceFilter {...{ betweenPrices, changeBetweenPrice }} />
    </aside>
  );
}
