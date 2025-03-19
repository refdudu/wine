import type { Dispatch, SetStateAction } from "react";
import { X } from "@phosphor-icons/react";
import { Drawer } from "@/components/Drawer";
import { BetweenPriceFilter } from "@/components/BetweenPriceFilter";
import { useHomeMobile } from "./useHomeMobile";
import { Button } from "@/components/Button";

interface HomeFilterDrawerProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export function HomeFilterDrawer({
  isVisible,
  setIsVisible,
}: HomeFilterDrawerProps) {
  const onClose = () => setIsVisible(false);
  return (
    <Drawer width="100%" open={isVisible} onClose={onClose}>
      {isVisible && <HomeFilterDrawerContent closeDrawer={onClose} />}
    </Drawer>
  );
}

interface HomeFilterDrawerContentProps {
  closeDrawer: () => void;
}
function HomeFilterDrawerContent({
  closeDrawer,
}: HomeFilterDrawerContentProps) {
  const { betweenPrices, handleFilterBetweenPrices } = useHomeMobile();
  function clearFilter() {
    handleFilterBetweenPrices(undefined);
    closeDrawer();
  }
  function changeBetweenPrice(betweenPrices?: string) {
    handleFilterBetweenPrices(betweenPrices);
    closeDrawer();
  }
  return (
    <div>
      <div className="absolute top-0 w-full bg-white pb-4 shadow-sm">
        <header className="text-lg p-4 flex justify-between items-center">
          <button onClick={closeDrawer}>
            <X className="text-custom-gray-dark" size={36} />
          </button>
        </header>
      </div>
      <main className="mt-24 px-4">
        <aside className="block font-neo w-64">
          <div className="flex gap-8 items-end">
            <h4 className="text-lg mt-8 text-custom-subtitle">Por preço</h4>
          </div>
          <BetweenPriceFilter
            {...{
              betweenPrices,
              changeBetweenPrice,
            }}
          />
        </aside>
      </main>
      {betweenPrices && (
        <footer className="absolute text-custom-violet bottom-0 w-full bg-white h-16 flex items-center justify-center lg:hidden">
          <Button onClick={clearFilter}>Limpar</Button>
        </footer>
      )}
    </div>
  );
}
