import { formatPrice } from "@/utils/formatPrice";

interface OrderTotalProps {
  total: number;
}

export const OrderTotal = ({ total }: OrderTotalProps) => {
  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-900">Total:</span>
        <span className="text-xl font-bold text-gray-900">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
};
