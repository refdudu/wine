import type { OrderI } from "@/interfaces/OrderI";
import { OrderTotal } from "../molecules";
import { OrderHeader } from "./OrderHeader";
import { OrderItemsList } from "./OrderItemsList";

interface OrderCardProps {
  order: OrderI;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  // Usar totalAmount da API ou calcular como fallback
  const totalAmount = order.totalAmount ?? order.items.reduce((total, item) => {
    return total + item.product.price * item.amount;
  }, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <OrderHeader order={order} totalAmount={totalAmount} />
        <OrderItemsList items={order.items} orderId={order.id} />
        <OrderTotal total={totalAmount} />
      </div>
    </div>
  );
};
