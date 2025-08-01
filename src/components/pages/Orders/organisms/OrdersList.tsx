import type { OrderI } from "@/interfaces/OrderI";
import { OrderCard } from "./OrderCard";

interface OrdersListProps {
  orders: OrderI[];
}

export const OrdersList = ({ orders }: OrdersListProps) => {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
