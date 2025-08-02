import type { OrderI } from "@/interfaces/OrderI";
import { formatPrice } from "@/utils/formatPrice";

interface OrderDetailsPaymentProps {
  order: OrderI;
}

export const OrderDetailsPayment = ({ order }: OrderDetailsPaymentProps) => {
  const totalAmount = order.totalAmount ?? order.items.reduce((total, item) => {
    return total + item.product.price * item.amount;
  }, 0);

  // Simular dados de pagamento (você pode expandir isso conforme sua necessidade)
  const subtotal = totalAmount;
  const shipping = 0; // Frete grátis
  const discount = 0; // Sem desconto

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Resumo do Pagamento
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal dos itens:</span>
          <span className="font-medium text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Frete:</span>
          <span className="font-medium text-green-600">
            {shipping === 0 ? 'Grátis' : formatPrice(shipping)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Desconto:</span>
            <span className="font-medium text-green-600">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-xl font-bold text-green-600">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Método de Pagamento</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">•••</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Cartão de Crédito</p>
            <p className="text-xs text-gray-500">•••• •••• •••• ••••</p>
          </div>
        </div>
      </div>
    </div>
  );
};
