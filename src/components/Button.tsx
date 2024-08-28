import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { Spin } from "./Spin";
import Link from "next/link";
import { hr } from "@faker-js/faker";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  href?: string;
}
export function Button({ isLoading, href, ...props }: ButtonProps) {
  const as = href ? Link : "button";

  const className = `filter hover:brightness-110 transition w-full py-2 font-lato  rounded-sm flex justify-center items-center gap-2 ${props.className}`;
  if (href) {
    return (
      <Link href={href} className={className}>
        {props.children}
        {isLoading && <Spin borderWidth={3} color="#fff" size={20} />}
      </Link>
    );
  }
  return (
    <button {...props} className={className}>
      {props.children}
      {isLoading && <Spin borderWidth={3} color="#fff" size={20} />}
    </button>
  );
}
