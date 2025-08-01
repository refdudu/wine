import { formatPrice } from "@/utils/formatPrice";

interface ProductPriceProps {
  price: number;
  amount: number;
}

export const ProductPrice = ({ price, amount }: ProductPriceProps) => {
  return (
    <div className="text-right">
      <p className="font-medium text-gray-900">
        {formatPrice(price * amount)}
      </p>
    </div>
  );
};
