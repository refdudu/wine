import { Spin } from "./Spin";

interface LoaderProps {
	children: React.ReactNode;
	isLoading: boolean;
}
export function Loader({ children, isLoading }: LoaderProps) {
	return (
		<div className="relative">
			{isLoading && (
				<div className="absolute - w-full h-full flex justify-center">
					<div className="pt-16">
						<Spin />
					</div>
				</div>
			)}
			{children}
		</div>
	);
}
