import type { OrderI } from "@/interfaces/OrderI";
import { CloseIcon } from "../atoms";
import { AddressInfo } from "../molecules";

interface AddressDropdownProps {
  address: OrderI["shippingAddress"];
  onClose: () => void;
}

export const AddressDropdown = ({ address, onClose }: AddressDropdownProps) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Endereço de Entrega</h4>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
            title="Fechar dropdown"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="text-sm text-gray-700 space-y-3">
          <AddressInfo 
            address={address} 
            type="user" 
            label="Destinatário:" 
          />
          <AddressInfo 
            address={address} 
            type="location" 
            label="Endereço:" 
          />
        </div>
      </div>
    </div>
  );
};
