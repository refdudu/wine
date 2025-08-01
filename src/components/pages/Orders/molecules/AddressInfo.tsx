import type { OrderI } from "@/interfaces/OrderI";
import { AddressIcon } from "../atoms";

interface AddressInfoProps {
  address: OrderI["shippingAddress"];
  type: "user" | "location";
  label: string;
}

export const AddressInfo = ({ address, type, label }: AddressInfoProps) => {
  return (
    <div className="flex items-start gap-2">
      <AddressIcon type={type} />
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        {type === "user" ? (
          <p>{address.recipientName}</p>
        ) : (
          <>
            <p>
              {address.address}, {address.number}
              {address.complement && `, ${address.complement}`}
            </p>
            <p>{address.neighborhood}</p>
            <p>
              {address.city.label} - {address.state.label}
            </p>
            <p>CEP: {address.cep}</p>
          </>
        )}
      </div>
    </div>
  );
};
