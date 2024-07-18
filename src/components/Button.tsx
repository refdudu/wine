import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { Spin } from "./Spin";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
export function Button({ isLoading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`filter hover:brightness-110 transition w-full py-2 font-lato  rounded-sm flex justify-center items-center gap-2 ${props.className}`}
    >
      {props.children}
      {isLoading && <Spin borderWidth={3} color="#fff" size={20} />}
    </button>
  );
}
