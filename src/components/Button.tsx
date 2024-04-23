import type { HTMLAttributes } from "react";

export function Button(props: HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			className={`bg-custom-green filter hover:brightness-110 transition w-full py-2 font-lato text-white rounded-sm ${props.className}`}
		/>
	);
}
