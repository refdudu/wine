/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/Button";
import { useSession } from "@/contexts/SessionContext";
import type { ProductI } from "@/interfaces/ProductI";
import { formatPrice } from "@/utils/formatPrice";
import classNames from "classnames";
import { useMemo, useState } from "react";
interface ProductCardProps {
  product: ProductI;
  onAdd: () => Promise<void>;
}
export function ProductCard({ onAdd, product }: ProductCardProps) {
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function handelAdd() {
    setIsLoading(true);
    await onAdd();
    setIsLoading(false);
  }

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
    <div
      data-cy="product-card"
      className="flex-1 flex flex-col gap-4 font-bold text-center"
    >
      <div className="flex flex-col items-center justify-center shadow-product-card bg-white md:p-4 px-0 py-4 h-[400px]">
        <img
          className="object-contain transition-transform max-h-40"
          width={200}
          src={product.image}
          alt={product.name}
        />
        <span
          className="text-custom-gray-dark mt-4"
          data-cy="product-card-name"
        >
          {product.name}
        </span>
        <div className="flex my-4 gap-2">
          <span className="text-3xs text-custom-gray line-through">
            {priceFormatted}
          </span>
          <div className="text-3xs bg-custom-orange px-1 py-0.25 rounded-md text-white">
            {product.percentOff}% OFF
          </div>
        </div>
        <div className="mb-1 flex gap-2 items-end">
          <span className="text-custom-gray-dark md:text-2xs text-xs uppercase">
            Sócio wine
          </span>
          <span className="text-custom-violet md:text-2xs text-xs">
            R${" "}
            <span className="md:text-xl text-lg">
              {partnerPriceFormatted.integer}
            </span>
            ,{partnerPriceFormatted.decimal}
          </span>
        </div>
        <span className="md:text-2xs text-xs text-custom-gray uppercase">
          Não sócio {priceFormatted}
        </span>
      </div>
      <Button
        disabled={!user || isLoading}
        isLoading={isLoading}
        onClick={handelAdd}
        className={`h-10 bg-custom-green text-white ${classNames({
          "brightness-90": isLoading,
          "hover:brightness-90": isLoading,
        })}`}
      >
        Adicionar
      </Button>
    </div>
  );
}
export function ProductCardSkeleton() {
  return (
    <div
      data-cy="product-card"
      className="flex-1 flex flex-col gap-4 font-bold text-center"
    >
      <div className=" shadow-product-card bg-white p-4 loading-card h-[400px]">
        <div className="w-[200px]" />
      </div>
      <Button className="h-10 cursor-not-allowed hover:brightness-100 " />
    </div>
  );
}
