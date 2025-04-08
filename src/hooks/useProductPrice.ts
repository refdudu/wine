import type { ProductI } from "@/interfaces/ProductI";
import { formatPrice } from "@/utils/formatPrice";
import { useMemo } from "react";

export const useProductPrice = ({ price, partnerPrice }: ProductI) => {
  const priceFormatted = useMemo(() => formatPrice(price), [price]);
  const partnerPriceFormatted = useMemo(() => {
    const integer = Math.floor(partnerPrice);
    const decimal = partnerPrice - integer;
    return {
      integer,
      decimal: Number(decimal * 100).toFixed(0),
    };
  }, [partnerPrice]);
  return {
    priceFormatted,
    partnerPriceFormatted: {
      integer: partnerPriceFormatted.integer.toString(),
      decimal: partnerPriceFormatted.decimal.toString(),
    },
  };
};
