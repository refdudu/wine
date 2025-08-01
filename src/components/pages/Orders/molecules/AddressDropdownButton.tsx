import { ChevronIcon } from "../atoms";

interface AddressDropdownButtonProps {
  recipientName: string;
  isOpen: boolean;
  onClick: () => void;
}

export const AddressDropdownButton = ({ 
  recipientName, 
  isOpen, 
  onClick 
}: AddressDropdownButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 rounded-md transition-colors"
      title="Ver endereço de entrega"
    >
      {recipientName}
      <ChevronIcon isOpen={isOpen} />
    </button>
  );
};
