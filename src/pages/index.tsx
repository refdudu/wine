/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import { InputHTMLAttributes, useId, useState } from "react";
import { XIcon } from "@/utils/icons";
import { ProductCard } from "@/components/pages/Home/ProductCard";
import { Header } from "@/components/Header";
import { api } from "@/utils/api";
import type { GetProductsResponse } from "./api/products";
import { Pagination } from "@/components/Pagination";
import { useQuery } from "react-query";

export default function Home() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get<GetProductsResponse>("products", {
        params: {
          pageIndex: 0,
          pageSize: 15,
        },
      });
      return data.products;
    },
    staleTime: 1000,
  });

  if (!products) {
    return null;
  }
  return (
    <div className="">
      <Header />
      <div className="max-w-[1120px] w-full m-auto my-10 flex justify-between">
        <SideBar />
        <main className="flex-1">
          <span onClick={() => {}}>
            <b>{products.length}</b> produtos encontrados
          </span>

          <div className="grid-products my-6">
            {products.map((product) => (
              <ProductCard
                key={product.name}
                {...{ product }}
                onAdd={() => {}}
              />
            ))}
          </div>
          <div className="flex justify-center ">
            <Pagination current={6} total={7} />
          </div>
        </main>
      </div>
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
