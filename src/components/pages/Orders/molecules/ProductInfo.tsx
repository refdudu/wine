import type { OrderItem } from "@/interfaces/OrderI";
import { formatPrice } from "@/utils/formatPrice";

interface ProductInfoProps {
  item: OrderItem;
}

export const ProductInfo = ({ item }: ProductInfoProps) => {
  return (
    <div className="flex-1">
      <h5 className="font-medium text-gray-900">{item.product.name}</h5>
      <p className="text-sm text-gray-500">
        Quantidade: {item.amount} x {formatPrice(item.product.price)}
      </p>
    </div>
  );
};
