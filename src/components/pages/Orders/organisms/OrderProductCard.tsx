import type { OrderItem } from "@/interfaces/OrderI";
import { ProductImage } from "../atoms";
import { ProductInfo, ProductPrice } from "../molecules";

interface OrderProductCardProps {
  item: OrderItem;
}

export const OrderProductCard = ({ item }: OrderProductCardProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16">
        <ProductImage 
          src={item.product.image} 
          alt={item.product.name} 
        />
      </div>
      <ProductInfo item={item} />
      <ProductPrice 
        price={item.product.price} 
        amount={item.amount} 
      />
    </div>
  );
};
