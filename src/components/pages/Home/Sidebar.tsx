import Image from "next/image";
import { BetweenPriceFilter } from "../../BetweenPriceFilter";
import { XIcon } from "@/utils/icons";

export interface SideBarProps {
	betweenPrices: string | null;
	changeBetweenPrice: (betweenPrice?: string) => void;
}
export function SideBar({ betweenPrices, changeBetweenPrice }: SideBarProps) {
	function clearFilter() {
		changeBetweenPrice(undefined);
	}
	return (
		<aside className="hidden lg:block font-neo w-64">
			<div className="font-extrabold">
				<h3 className="text-xl">Refine sua busca</h3>
				<div className="flex gap-8 items-end">
					<h4 className="text-lg mt-8 text-custom-subtitle">Por preço</h4>
					{betweenPrices && (
						<button type="button" className="flex items-center gap-1 font-normal cursor-pointer" onClick={clearFilter}>
							<Image alt="X" src={XIcon} width={16} height={16} />
							<span data-cy="clear-between-prices-filter">Limpar</span>
						</button>
					)}
				</div>
			</div>
			<BetweenPriceFilter {...{ betweenPrices, changeBetweenPrice }} />
		</aside>
	);
}
