import type { OrderI } from "@/interfaces/OrderI";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";

interface OrderDetailsItemsProps {
  order: OrderI;
}

export const OrderDetailsItems = ({ order }: OrderDetailsItemsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Itens do Pedido
      </h2>

      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div key={`${order.id}-${item.product.id}-${index}`} 
               className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className="flex-shrink-0">
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded-lg object-cover bg-gray-100"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {item.product.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-sm text-gray-500">Preço unitário:</span>
                    <p className="font-medium text-gray-900">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500">Quantidade:</span>
                    <p className="font-medium text-gray-900">
                      {item.amount}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm text-gray-500">Subtotal:</span>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatPrice(item.product.price * item.amount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-900">
            Total do Pedido:
          </span>
          <span className="text-2xl font-bold text-green-600">
            {formatPrice(order.totalAmount ?? order.items.reduce((total, item) => {
              return total + item.product.price * item.amount;
            }, 0))}
          </span>
        </div>
      </div>
    </div>
  );
};
