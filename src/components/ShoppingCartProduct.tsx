import type { ShoppingCartProductI } from "@/interfaces/ProductShoppingCartI";
import classNames from "classnames";
import Image from "next/image";
import { Counter } from "./Couter";
import { XCircleIcon } from "@/utils/icons";
import { formatPrice } from "@/utils/formatPrice";

interface ProductCountProps {
  product: ShoppingCartProductI;
  index: number;
  array: ShoppingCartProductI[];
  handleRemove: (productId: string) => Promise<void>;
  changeProductAmount: (productId: string, amount: number) => Promise<void>;
}
export function ShoppingCartProduct({
  product,
  index,
  array,
  changeProductAmount,
  handleRemove,
}: ProductCountProps) {
  return (
    <div
      key={product.id}
      className={`flex gap-4 items-center p-4  border-custom-gray-light ${classNames({
        "border-b": index !== array.length - 1,
      })}`}
    >
      <img
        className="w-full max-w-16 h-24 object-contain"
        src={product.image}
        alt={product.name}
      />
      <div className="flex-1 p-4 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center">
          <span>{product.name}</span>
          <button type="button" onClick={() => handleRemove(product.id)}>
            <Image width={20} height={20} src={XCircleIcon} alt="X" />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <Counter
            handleAdd={() =>
              changeProductAmount(product.id, product.amount + 1)
            }
            handleRemove={() =>
              changeProductAmount(product.id, product.amount - 1)
            }
            total={product.amount}
          />
          <span className="text-xl text-custom-violet">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
