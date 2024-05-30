import { CaretDown } from "@phosphor-icons/react";
import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Form } from "../Form";

interface Option {
  id: string;
  label: string;
}
interface DropdownProps {
  options: Option[];
  onChange: (option: Option) => void;
}
export function Dropdown({ options, onChange }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="flex flex-col" onBlur={() => setIsOpened(false)}>
      <button
        type="button"
        onFocus={() => setIsOpened(true)}
        className="outline-none flex justify-between items-center flex-1 w-full py-2 border-b border-custom-gray peer focus:border-custom-tannat"
      >
        <span>{selectedOption?.label}</span>
        <CaretDown />
      </button>
      <Form.Label hasValue={Boolean(selectedOption)} htmlFor="country">
        País
      </Form.Label>
      <div
        className={`transition flex flex-col items-start shadow-md p-2 ${classNames(
          {
            "opacity-0": !isOpened,
            "opacity-100": isOpened,
          }
        )}`}
      >
        {options.map((option) => (
          <button
            onClick={() => setSelectedOption(option)}
            type="button"
            key={option.id}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
