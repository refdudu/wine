import { useSession } from "@/contexts/SessionContext";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import WineLogo from "@/images/WineLogo.svg";
import { SearchIcon, AccountIcon, ShoppingCardIcon } from "@/utils/icons";
import classNames from "classnames";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../Button";
interface Line {
  left: number;
  width: number;
}
interface Tab {
  key: string;
  name: string;
}
const iconsProps = {
  width: 48,
  height: 48,
};
export function Header() {
  return (
    <header className="text-custom-gray bg-white flex items-center text-lg h-[88px] font-neo w-full shadow-md">
      <div className="flex justify-between items-center w-full max-w-[1120px] m-auto px-3">
        <div className="flex gap-20">
          <Image alt="Wine" width={100} height={28} src={WineLogo} />
          <div className="hidden lg:block">
            <Tabs />
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <Image {...iconsProps} src={SearchIcon} alt="Pesquisa" />
          <UserPopup />
          <ShoppingCartButton />
        </div>
      </div>
    </header>
  );
}
function ShoppingCartButton() {
  const { shoppingCartProducts, handleOpenDrawer } = useShoppingCart();

  return (
    <button
      type="button"
      className="relative"
      style={{ ...iconsProps }}
      onClick={handleOpenDrawer}
    >
      <Image {...iconsProps} src={ShoppingCardIcon} alt="Carrinho de compras" />
      {shoppingCartProducts.length > 0 && (
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white shadow-lg text-custom-green flex items-center justify-center rounded-full text-sm">
          <span>{shoppingCartProducts.length}</span>
        </div>
      )}
    </button>
  );
}
function UserPopup() {
  const { signIn, signOut, user, isLoadingAuthorization, isAuthorized } =
    useSession();
  const [isOpened, setIsOpened] = useState(true);
  const userImage = user?.photoURL;
  const divRef = useRef<HTMLDivElement>(null);

  const className = (triangle: boolean) => ({
    "opacity-0 pointer-events-none ": !isOpened,
    "opacity-100 scale-100": isOpened,
    "scale-90": triangle && !isOpened,
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setIsOpened(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    setIsOpened(!isAuthorized);
  }, [isAuthorized]);

  return (
    <div ref={divRef} className="relative flex items-center justify-center">
      <button
        type="button"
        className="rounded-full overflow-hidden"
        style={{ ...iconsProps }}
        onClick={() => setIsOpened((p) => !p)}
      >
        <Image {...iconsProps} src={userImage ?? AccountIcon} alt="Conta" />
      </button>
      {!isLoadingAuthorization && (
        <>
          <div
            className={classNames(
              "bg-white w-4 h-4 absolute top-14 left-1/2  rotate-45 border-t border-l border-custom-gray-light z-20 transition-opacity duration-500 ease-in-out",
              className(true)
            )}
          />
          <div
            className={classNames(
              "bg-white flex items-center px-4 justify-center absolute border border-custom-gray-light shadow-lg w-48 h-24 z-10 top-16 left-1/2 -translate-x-1/2 rounded-md transition-opacity duration-300 ease-in-out",
              className(false)
            )}
          >
            <Button
              styleType="primary-outline"
              onClick={() => (user ? signOut() : signIn())}
            >
              {user ? "Sair" : "Faça seu login"}
            </Button>
          </div>
        </>
      )}
    </div>
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
        className="absolute -bottom-2 h-[2px] bg-custom-tannat transition-all duration-300 "
      />
    </div>
  );
}
