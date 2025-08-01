import type { OrderI } from "@/interfaces/OrderI";
import { OrderProductCard } from "./OrderProductCard";

interface OrderItemsListProps {
  items: OrderI["items"];
  orderId: string;
}

export const OrderItemsList = ({ items, orderId }: OrderItemsListProps) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <h4 className="font-medium text-gray-900 mb-3">Itens do pedido:</h4>
      <div className="space-y-3">
        {items.map((item) => (
          <OrderProductCard
            item={item}
            key={`${orderId}-${item.product.id}`}
          />
        ))}
      </div>
    </div>
  );
};
