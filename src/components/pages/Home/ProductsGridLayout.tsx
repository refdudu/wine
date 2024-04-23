import Image from "next/image";
import { MagnifyingGlassIcon } from "@/utils/icons";
import { type FormEvent, useRef } from "react";
import { Loader } from "@/components/Loader";

export interface ProductsGridProps {
	handleFilterSearch: (text: string) => void;
	searchText: string;
	totalProducts: number;
	children: React.ReactNode;
	isLoading: boolean;
	footer?: React.ReactNode;
}

export function ProductsGridLayout({ searchText, handleFilterSearch, children, totalProducts, footer, isLoading }: ProductsGridProps) {
	const inputSearchRef = useRef<HTMLInputElement>(null);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const inputValue = inputSearchRef.current?.value.trim() || "";
		handleFilterSearch(inputValue);
	};
	return (
		<main className="flex-1">
			<div className="flex justify-between lg:items-center flex-col lg:flex-row gap-4">
				<form onSubmit={handleSubmit} className="lg:max-w-xs flex-1 bg-white flex p-2">
					<input ref={inputSearchRef} className="outline-none w-full" placeholder="Pesquisar" defaultValue={searchText || ""} />
					<button type="submit" className="filter brightness-0">
						<Image width={24} height={24} src={MagnifyingGlassIcon} alt="Pesquisa" className="" />
					</button>
				</form>
				<span className="border-b lg:border-none pb-4 lg:pb-0 border-custom-gray">
					<b>{totalProducts}</b> produtos encontrados
				</span>
			</div>

			<Loader isLoading={isLoading}>
				<div className="grid-products my-6 flex-1">{children}</div>
			</Loader>
			{footer && footer}
		</main>
	);
}
