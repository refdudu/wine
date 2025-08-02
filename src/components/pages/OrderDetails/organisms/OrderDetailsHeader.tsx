import type { OrderI } from "@/interfaces/OrderI";
import { formatPrice } from "@/utils/formatPrice";
import { StatusBadge } from "@/components/pages/Orders/atoms";

interface OrderDetailsHeaderProps {
  order: OrderI;
  onBack: () => void;
}

export const OrderDetailsHeader = ({ order, onBack }: OrderDetailsHeaderProps) => {
  const totalAmount = order.totalAmount ?? order.items.reduce((total, item) => {
    return total + item.product.price * item.amount;
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          Detalhes do Pedido #{order.id}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Data do Pedido
          </h3>
          <p className="text-lg font-medium text-gray-900">
            {new Date(order.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Status
          </h3>
          <StatusBadge status={order.status} />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Total
          </h3>
          <p className="text-lg font-bold text-green-600">
            {formatPrice(totalAmount)}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Itens
          </h3>
          <p className="text-lg font-medium text-gray-900">
            {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
          </p>
        </div>
      </div>
    </div>
  );
};
