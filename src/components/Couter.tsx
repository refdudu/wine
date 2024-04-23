interface CounterProps {
	handleAdd: () => void;
	handleRemove: () => void;
	total: number;
}
export function Counter({ handleAdd, handleRemove, total }: CounterProps) {
	return (
		<div className="border border-custom-gray rounded-md flex gap-4 px-2 py-1">
			<button className="text-custom-gray" onClick={handleRemove}>
				-
			</button>
			<span className="text-custom-gray">{total}</span>
			<button className="text-custom-gray" onClick={handleAdd}>
				+
			</button>
		</div>
	);
}
