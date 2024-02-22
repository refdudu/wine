/* eslint-disable @next/next/no-img-element */

import { ProductI } from "@/interfaces/ProductI";
import { useMemo } from "react";

interface ProductCardProps {
  product: ProductI;
  onAdd: () => void;
}

export function ProductCard({ onAdd, product }: ProductCardProps) {
  const formatPrice = (price: number) =>
    price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const priceFormatted = useMemo(
    () => formatPrice(product.price),
    [product.price]
  );
  const partnerPriceFormatted = useMemo(() => {
    const integer = Math.floor(product.partnerPrice);
    const decimal = product.partnerPrice - integer;
    return {
      integer,
      decimal: Number(decimal * 100).toFixed(0),
    };
  }, [product.partnerPrice]);

  return (
    <div className="w-[256px] flex flex-col gap-4 font-bold text-center">
      <div className="flex flex-col items-center shadow-product-card bg-white p-4">
        <img
          className="object-contain transition-transform max-h-40"
          width={200}
          src={product.image}
          alt={product.name}
        />
        <span className="text-custom-gray-dark mt-4">{product.name}</span>
        <div className="flex my-4 gap-2">
          <span className="text-3xs text-custom-gray line-through">
            {priceFormatted}
          </span>
          <div className="text-3xs bg-custom-orange px-1 py-0.25 rounded-md text-white">
            {product.percentOff}% OFF
          </div>
        </div>
        <div className="mb-1 flex gap-2 items-end">
          <span className="text-custom-gray-dark text-2xs uppercase">
            Sócio wine
          </span>
          <span className="text-custom-violet text-2xs">
            R$ <span className="text-xl">{partnerPriceFormatted.integer}</span>,
            {partnerPriceFormatted.decimal}
          </span>
        </div>
        <span className="text-2xs text-custom-gray uppercase">
          Não sócio {priceFormatted}
        </span>
      </div>
      <button
        onClick={onAdd}
        className="bg-custom-green filter hover:brightness-110 transition flex-1 py-2 font-lato text-white rounded-sm"
      >
        Adicionar
      </button>
    </div>
  );
}
