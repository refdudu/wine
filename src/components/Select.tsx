import classNames from "classnames";
import { Dispatch, SetStateAction, useId, useState } from "react";
interface SelectProps {
  label: string;
  options: Option[];
  selectedOption: Option | null;
  setSelectedOption: (state: Option | null) => void;
  setText: (text: string) => void;
  text:string;
}

export interface Option {
  label: string;
  key: string;
}

export function Select({
  label,
  options,
  selectedOption,
  setSelectedOption,
  setText,
  text
}: SelectProps) {
  const id = useId();
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
  return (
    <div className="relative w-full">
      <input
        autoComplete="one-time-code"
        type="text"
        onFocus={() => setIsVisibleDropdown(true)}
        onBlur={() => setTimeout(() => setIsVisibleDropdown(false), 50)}
        id={id}
        className={`placeholder:text-custom-text w-full peer bg-transparent border-b border-b-custom-gray-light outline-none py-2 px-1 focus:border-b-custom-violet`}
        onChange={(e) => setText(e.currentTarget.value)}
        value={text}
        placeholder={selectedOption?.label}
      />
      <label
        htmlFor={id}
        className={`absolute left-1 transition-all  ${classNames({
          "-top-3": selectedOption || isVisibleDropdown,
          "-translate-y-0": selectedOption || isVisibleDropdown,
          "text-xs": selectedOption || isVisibleDropdown,
          "-translate-y-1/2": !selectedOption && !isVisibleDropdown,
          "top-1/2": !selectedOption && !isVisibleDropdown,
        })}`}
      >
        {label}
      </label>
      <div
        className={`absolute bg-white w-full flex flex-col max-h-44 overflow-auto transition-all shadow ${classNames(
          {
            "opacity-0": !isVisibleDropdown,
            "z-10": isVisibleDropdown,
            "-z-50": !isVisibleDropdown,
          }
        )}`}
      >
        {options.map((x) => (
          <button
            type="button"
            className=""
            onClick={() => setSelectedOption(x)}
          >
            <div className="h-8 flex items-center hover:bg-custom-violet px-2 hover:bg-opacity-40">
              <span>{x.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
