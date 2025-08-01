import { useState, useEffect } from "react";
import type { OrderI } from "@/interfaces/OrderI";
import { formatPrice } from "@/utils/formatPrice";
import { OrderInfoField, StatusBadge } from "../atoms";
import { AddressDropdownButton } from "../molecules";
import { AddressDropdown } from "./AddressDropdown";
import Link from "next/link";

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
    <div className="flex gap-4 flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
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

      <OrderInfoField label="TOTAL" value={formatPrice(totalAmount)} />

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

      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 text-sm text-gray-500">
        <span>PEDIDO #{order.id}</span>
        <div className="flex items-center gap-2">
          <Link href={`/profile/orders/${order.id}`}>
            <span className="text-blue-600 hover:underline">
              Detalhes do Pedido
            </span>
          </Link>
          <StatusBadge status={order.status} />
        </div>
      </div>
    </div>
  );
};
