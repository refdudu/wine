import { type InputHTMLAttributes, useId } from "react";
interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
	children: React.ReactNode;
}
export function RadioInput({ children, ...props }: RadioInputProps) {
	const id = useId();
	return (
		<div className="flex gap-2 text-custom-text cursor-pointer w-full">
			<input className="cursor-pointer" id={id} type="radio" {...props} />
			<label className="cursor-pointer w-full" htmlFor={id}>
				{children}
			</label>
		</div>
	);
}
