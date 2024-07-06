import classNames from "classnames";
import { useId, useState } from "react";

interface InputProps {
  label: string;
}
export function Input({ label }: InputProps) {
  const id = useId();
  const [text, setText] = useState<string>("");
  const hasText = text.length > 0;
  return (
    <div className="relative w-full">
      <input
        autoComplete="one-time-code"
        id={id}
        className={`w-full peer bg-transparent border-b border-b-custom-gray-light outline-none py-2 px-1 focus:border-b-custom-violet ${classNames(
          {
            "border-b-custom-violet": hasText,
          }
        )}`}
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <label
        htmlFor={id}
        className={`absolute left-1  transition-all peer-focus:-top-3 peer-focus:-translate-y-0 peer-focus:text-xs ${classNames(
          {
            "-top-3": hasText,
            "-translate-y-0": hasText,
            "text-xs": hasText,
            "-translate-y-1/2": !hasText,
            "top-1/2": !hasText,
          }
        )}`}
      >
        {label}
      </label>
    </div>
  );
}
