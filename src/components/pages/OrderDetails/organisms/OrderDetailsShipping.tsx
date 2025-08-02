import type { OrderI } from "@/interfaces/OrderI";

interface OrderDetailsShippingProps {
  order: OrderI;
}

export const OrderDetailsShipping = ({ order }: OrderDetailsShippingProps) => {
  const { shippingAddress } = order;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Endereço de Entrega
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">
            {shippingAddress.recipientName}
          </h3>
          <p className="text-gray-600">
            {shippingAddress.phone}
          </p>
        </div>

        <div className="space-y-1 text-gray-600">
          <p>{shippingAddress.address}, {shippingAddress.number}</p>
          {shippingAddress.complement && (
            <p>{shippingAddress.complement}</p>
          )}
          <p>{shippingAddress.neighborhood}</p>
          <p>{shippingAddress.city.label} - {shippingAddress.state.label}</p>
          <p>CEP: {shippingAddress.cep}</p>
          {shippingAddress.referencePoint && (
            <p className="text-sm text-gray-500">
              Referência: {shippingAddress.referencePoint}
            </p>
          )}
        </div>

        {shippingAddress.addressIdentify && (
          <div className="pt-4 border-t border-gray-100">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {shippingAddress.addressIdentify}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
