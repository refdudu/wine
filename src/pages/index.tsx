/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import { InputHTMLAttributes, useCallback, useId, useState } from "react";
import { XIcon } from "@/utils/icons";
import { ProductCard } from "@/components/pages/Home/ProductCard";
import { Header } from "@/components/Header";
import { api } from "@/utils/api";
import { Pagination } from "@/components/Pagination";

import { GetProductsFilter } from "@/api/product/ProductRepository";
import { useSearchParams } from "next/navigation";
import { ListResponse } from "@/api/product/ProductService";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function Home() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pageIndex = searchParams.get("pageIndex")
    ? Number(searchParams.get("pageIndex"))
    : 0;
  const betweenPrices = searchParams.get("betweenPrices");

  const {
    data: productsResponse,
    isLoading,
    isFetching,
  } = useQuery(
    ["products", pageIndex],
    async () => {
      const { data } = await api.get<ListResponse>("products", {
        params: {
          pageIndex,
          pageSize: 15,
        },
      });
      const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
      await promise();
      return data;
    },
    {
      keepPreviousData: true,
    }
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      replace(`${window.location.pathname}?${params.toString()}`);
    },
    [replace, searchParams]
  );
  if (!productsResponse) {
    return null;
  }
  return (
    <div className="">
      <Header />
      <div className="max-w-[1120px] w-full m-auto my-10 flex justify-between">
        <SideBar />
        <main className="flex-1">
          {isLoading && "carregando"}
          {isFetching && "isFetching"}
          <div className="flex justify-center ">
            <Pagination
              current={pageIndex}
              changePageIndex={(pageIndex) =>
                createQueryString("pageIndex", String(pageIndex))
              }
              total={Math.ceil(
                productsResponse.total / productsResponse.pageSize
              )}
            />
          </div>
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
              changePageIndex={(pageIndex) =>
                createQueryString("pageIndex", String(pageIndex))
              }
              total={Math.ceil(
                productsResponse.total / productsResponse.pageSize
              )}
            />
          </div>
        </main>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

type FilterValues = "0-40" | "40-60" | "100-200" | "200-500" | "500-*";

interface FilterOption {
  label: string;
  value: FilterValues;
}

const filterOptions: FilterOption[] = [
  {
    label: "Até R$40",
    value: "0-40",
  },
  {
    label: "R$40 A R$60",
    value: "40-60",
  },
  { label: "R$100 A R$200", value: "100-200" },
  {
    label: "R$200 A R$500",
    value: "200-500",
  },
  {
    label: "Acima de R$500",
    value: "500-*",
  },
];

function SideBar() {
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<FilterValues | null>(null);

  return (
    <aside className="font-neo w-64">
      <div className="font-extrabold ">
        <h3 className="text-xl">Refine sua busca</h3>
        <div className="flex gap-8 items-end">
          <h4 className="text-lg mt-8 text-custom-subtitle">Por preço</h4>
          {selectedFilterOption && (
            <div
              className="flex items-center gap-1 font-normal cursor-pointer"
              onClick={() => setSelectedFilterOption(null)}
            >
              <Image alt="X" src={XIcon} width={16} height={16} />
              <span>Limpar</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {filterOptions.map((option) => (
          <RadioInput
            value={option.value}
            checked={option.value === selectedFilterOption}
            key={option.value}
            name="between_the_price"
            onChange={() => setSelectedFilterOption(option.value)}
          >
            {option.label}
          </RadioInput>
        ))}
      </div>
    </aside>
  );
}

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}
function RadioInput({ children, ...props }: RadioInputProps) {
  const id = useId();

  return (
    <div className="flex gap-2 text-custom-text cursor-pointer">
      <input className="cursor-pointer" id={id} type="radio" {...props} />
      <label className="cursor-pointer" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
