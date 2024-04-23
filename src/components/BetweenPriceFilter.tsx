import { RadioInput } from "./RadioInput";
type BetweenPriceFilterValues = "0-40" | "40-60" | "100-200" | "200-500" | "500-*";
interface FilterOption {
	label: string;
	value: BetweenPriceFilterValues;
}
const filterOptions: FilterOption[] = [
	{
		label: "Até R$40",
		value: "0-40"
	},
	{
		label: "R$40 A R$60",
		value: "40-60"
	},
	{ label: "R$100 A R$200", value: "100-200" },
	{
		label: "R$200 A R$500",
		value: "200-500"
	},
	{
		label: "Acima de R$500",
		value: "500-*"
	}
];
interface BetweenPriceFilterProps {
	betweenPrices: string | null;
	changeBetweenPrice: (betweenPrice?: string) => void;
}
export function BetweenPriceFilter({ betweenPrices, changeBetweenPrice }: BetweenPriceFilterProps) {
	return (
		<div data-cy="between-prices-filter" className="flex flex-col gap-4 mt-4">
			{filterOptions.map((option) => (
				<RadioInput
					value={option.value}
					checked={option.value === betweenPrices}
					key={option.value}
					name="between_the_price"
					onChange={() => changeBetweenPrice(option.value)}>
					{option.label}
				</RadioInput>
			))}
		</div>
	);
}
