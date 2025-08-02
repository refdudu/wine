import type { OrderI } from "@/interfaces/OrderI";
import { OrderProductCard } from "./OrderProductCard";
import Link from "next/link";

interface OrderItemsListProps {
  items: OrderI["items"];
  orderId: string;
}

export const OrderItemsList = ({ items, orderId }: OrderItemsListProps) => {
  const displayItems = items.slice(0, 3);
  const hasMoreItems = items.length > 3;
  const remainingCount = items.length - 3;

  return (
    <div className="border-t border-gray-200 pt-4">
      <h4 className="font-medium text-gray-900 mb-3">Itens do pedido:</h4>
      <div className="space-y-3">
        {displayItems.map((item) => (
          <OrderProductCard
            item={item}
            key={`${orderId}-${item.product.id}`}
          />
        ))}
        
        {hasMoreItems && (
          <div className="pt-3 border-t border-gray-100">
            <Link href={`/profile/orders/${orderId}`}>
              <span className="text-blue-600 hover:underline text-sm font-medium">
                Ver mais {remainingCount} {remainingCount === 1 ? 'item' : 'itens'}
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
