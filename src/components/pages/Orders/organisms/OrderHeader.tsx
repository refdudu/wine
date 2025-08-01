import { useState, useEffect } from "react";
import type { OrderI } from "@/interfaces/OrderI";
import { formatPrice } from "@/utils/formatPrice";
import { OrderInfoField, StatusBadge } from "../atoms";
import { AddressDropdownButton } from "../molecules";
import { AddressDropdown } from "./AddressDropdown";

interface OrderHeaderProps {
  order: OrderI;
  totalAmount: number;
}

export const OrderHeader = ({ order, totalAmount }: OrderHeaderProps) => {
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showAddressDropdown && !target.closest(".address-dropdown")) {
        setShowAddressDropdown(false);
      }
    };

    if (showAddressDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showAddressDropdown]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
      <OrderInfoField
        label="PEDIDO REALIZADO EM"
        value={new Date(order.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      />
      
      <OrderInfoField
        label="TOTAL"
        value={formatPrice(totalAmount)}
      />

      <OrderInfoField
        label="ENDEREÇO DE ENTREGA"
        value={
          <div className="relative address-dropdown">
            <AddressDropdownButton
              recipientName={order.shippingAddress.recipientName}
              isOpen={showAddressDropdown}
              onClick={() => setShowAddressDropdown(!showAddressDropdown)}
            />
            
            {showAddressDropdown && (
              <AddressDropdown
                address={order.shippingAddress}
                onClose={() => setShowAddressDropdown(false)}
              />
            )}
          </div>
        }
      />

      <div className="flex flex-col items-end gap-2 text-sm text-gray-500">
        <span>PEDIDO #{order.id}</span>
        <StatusBadge status={order.status} />
      </div>
    </div>
  );
};
