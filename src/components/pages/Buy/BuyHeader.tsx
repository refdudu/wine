import Image from "next/image";
import WineLogo from "@/images/WineLogo.svg";
import {
  CaretRight,
  Check,
  CreditCard,
  type Icon,
  MapPin,
  User,
} from "@phosphor-icons/react";
import classNames from "classnames";
import Link from "next/link";
import {
  useShoppingCart,
  useTotalShoppingCartProducts,
} from "@/contexts/ShoppingCartContext";
import { useRouter } from "next/router";

interface BuyHeaderProps {
  openDrawer: () => void;
}
export function BuyHeader({ openDrawer }: BuyHeaderProps) {
  const { pathname } = useRouter();
  const isAddress = pathname.includes("address");
  const isPayment =
    pathname.includes("payment") ||
    pathname.includes("credit-card") ||
    pathname.includes("checkout");

  return (
    <header className="text-custom-gray bg-white flex items-center text-lg h-[88px] font-neo w-full shadow-md">
      <div className="flex justify-between items-center w-full max-w-[1200px] m-auto px-3">
        <div>
          <Link href="/">
            <Image alt="Wine" width={100} height={28} src={WineLogo} />
          </Link>
        </div>
        <ShoppingCartData onClick={openDrawer} />
        <div className="hidden lg:flex items-center gap-4">
          <Step
            isCurrent={isAddress}
            isSuccess={isPayment}
            Icon={MapPin}
            label="ENDEREÇO"
          />
          <CaretRight size={36} />
          <Step isCurrent={isPayment} Icon={CreditCard} label="PAGAMENTO" />
        </div>
        <div className="hidden lg:flex" />
      </div>
    </header>
  );
}

interface ShoppingCartDataProps {
  onClick?: () => void;
}
export function ShoppingCartData({ onClick }: ShoppingCartDataProps) {
  const { shoppingCartProducts } = useShoppingCart();
  const { totalFormatted } = useTotalShoppingCartProducts();

  return (
    <button
      type="button"
      onClick={onClick}
      className="lg:hidden flex flex-col justify-end items-end"
    >
      <span className="text-custom-subtitle">
        {shoppingCartProducts.length} Itens
      </span>
      <span>
        <span className="text-custom-violet">{totalFormatted}</span>
      </span>
    </button>
  );
}
interface StepProps {
  Icon: Icon;
  label: string;
  isCurrent?: boolean;
  isSuccess?: boolean;
}
function Step({ Icon, label, isCurrent, isSuccess }: StepProps) {
  return (
    <div
      className={`flex items-center gap-2 ${classNames({
        "text-custom-violet": isCurrent,
        "text-custom-green": isSuccess,
      })}`}
    >
      <div className="relative">
        <Icon size={28} />
        {isSuccess && (
          <div className="flex items-center justify-center absolute -right-1 -bottom-1 w-4 h-4 bg-custom-green  rounded-full">
            <Check className="text-white" size={12} />
          </div>
        )}
      </div>
      <span>{label}</span>
    </div>
  );
}
