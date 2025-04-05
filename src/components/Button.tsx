import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { Spin } from "./Spin";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  href?: string;
  icon?: React.ReactNode;
  linkShallow?: boolean;
  styleType?: "default" | "success" | "primary-full" | "primary-outline";
  spinColor?: string;
}
export function Button({
  isLoading,
  href,
  icon,
  linkShallow,
  styleType,
  spinColor,
  ...props
}: ButtonProps) {
  let typeClass = "";
  switch (styleType) {
    case "primary-full":
      typeClass = "bg-custom-violet text-white";
      break;
    case "primary-outline":
      typeClass = "border border-custom-violet text-custom-violet bg-white";
      break;
    case "default":
      typeClass =
        "bg-white border text-custom-gray-light border-custom-gray-light hover:bg-custom-gray-light hover:text-white";
      break;
    case "success":
      typeClass = "bg-custom-green text-white";
      break;
  }
  const className = `filter hover:brightness-110 transition w-full font-lato  rounded-sm flex justify-center items-center gap-2 ${typeClass} ${props.className}`;
  const SpinC = () => (
    <Spin borderWidth={3} color={spinColor ?? "#fff"} size={20} />
  );
  if (href) {
    return (
      <Link href={href} className={`${className}`} shallow={linkShallow}>
        {props.children}
        {isLoading && <SpinC />}
        {!isLoading && icon}
      </Link>
    );
  }
  return (
    <button {...props} className={className}>
      {props.children}
      {isLoading && <SpinC />}
      {!isLoading && icon}
    </button>
  );
}
