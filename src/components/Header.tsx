import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import WineLogo from "@/images/WineLogo.svg";
import { SearchIcon, AccountIcon, ShoppingCardIcon } from "@/utils/icons";
import classNames from "classnames";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
interface Line {
  left: number;
  width: number;
}
interface Tab {
  key: string;
  name: string;
}
export function Header() {
  const { products, handleOpenDrawer } = useShoppingCart();
  const iconsProps = {
    width: 48,
    height: 48,
  };
  return (
    <header className="text-custom-gray bg-white flex items-center text-lg h-[88px] font-neo w-full shadow-md">
      <div className="flex justify-between items-center w-full max-w-[1120px] m-auto px-3">
        <div className="flex gap-20">
          <Image alt="Wine" width={100} height={28} src={WineLogo} />
          <div className="hidden lg:block">
            <Tabs />
          </div>
        </div>
        <div className="flex gap-10">
          <Image
            {...iconsProps}
            src={SearchIcon}
            alt="Pesquisa"
            className="cursor-pointer"
          />
          <Image
            {...iconsProps}
            src={AccountIcon}
            alt="Conta"
            className="cursor-pointer hidden lg:block"
          />
          <button
            type="button"
            className="relative"
            style={{ ...iconsProps }}
            onClick={handleOpenDrawer}
          >
            <Image
              {...iconsProps}
              src={ShoppingCardIcon}
              alt="Carrinho de compras"
              className="cursor-pointer"
            />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white shadow-lg text-custom-green flex items-center justify-center rounded-full text-sm">
              <span>{products.length}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
function Tabs() {
  const headerTabs: Tab[] = [
    { name: "Clube", key: "club" },
    {
      name: "Loja",
      key: "shop",
    },
    {
      key: "1",
      name: "Produtores",
    },
    {
      key: "offers",
      name: "Ofertas",
    },
    {
      key: "events",
      name: "Eventos",
    },
  ];
  const [activeTabKey, setActiveTabKey] = useState<string>("club");
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [line, setLine] = useState<Line>({ left: 0, width: 0 });

  function handleSetLine(): void {
    if (!activeTabRef.current) return;
    const { clientWidth, offsetLeft } = activeTabRef.current;
    setLine({
      left: offsetLeft,
      width: clientWidth,
    });
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleSetLine();
  }, [activeTabKey]);
  return (
    <div className="flex relative items-center gap-12">
      {headerTabs.map(({ name, key }) => {
        const isActiveKey = key === activeTabKey;
        return (
          <button
            type="button"
            onClick={() => setActiveTabKey(key)}
            ref={isActiveKey ? activeTabRef : null}
            key={key}
            className={`${classNames({
              "text-custom-tannat": isActiveKey,
            })} cursor-pointer`}
          >
            <span>{name}</span>
          </button>
        );
      })}
      <div
        style={{
          width: line.width,
          left: line.left,
        }}
        className="absolute -bottom-2 h-[2px] bg-custom-tannat transition-all time "
      />
    </div>
  );
}
