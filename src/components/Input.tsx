import classNames from "classnames";
import { type ChangeEvent, type InputHTMLAttributes, useId } from "react";
import InputMask, { ReactInputMask } from "react-input-mask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  beforeInputText?: string;
  mask?: string;
  onChangeText?: (text: string) => void;
  error?: string;
}
export function Input({
  label,
  beforeInputText,
  mask,
  value,
  onChangeText,
  onChange,
  error,
  ...props
}: InputProps) {
  const id = useId();
  const hasText = Boolean(value);
  function _onChange(e: ChangeEvent<HTMLInputElement>) {
    if (onChangeText) return onChangeText(e.currentTarget.value);
    if (onChange) return onChange(e);
  }
  const inputProps = {
    autoComplete: "one-time-code",
    id,
    className: `flex-1 peer bg-transparent border-b border-b-custom-gray-light outline-none py-2 px-1 focus:border-b-custom-violet ${classNames(
      {
        "border-b-custom-violet": hasText,
      }
    )}`,
    value,
    onChange: _onChange,
    ...props,
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex w-full">
        {beforeInputText && (
          <div className="items-center justify-center flex border-b border-b-custom-gray-light px-1">
            <span className="">Portaria 24h</span>
          </div>
        )}
        {mask ? (
          <ReactInputMask mask={mask} value={value} onChange={_onChange}>
            <input {...inputProps} />
          </ReactInputMask>
        ) : (
          <input {...inputProps} />
        )}
        <label
          htmlFor={id}
          className={`absolute left-1 text-custom-gray  transition-all peer-focus:-top-3 peer-focus:-translate-y-0 peer-focus:text-sm ${classNames(
            {
              "-top-3": hasText || beforeInputText,
              "-translate-y-0": hasText || beforeInputText,
              "text-sm": hasText || beforeInputText,
              "-translate-y-1/2": !hasText && !beforeInputText,
              "top-1/2": !hasText && !beforeInputText,
            }
          )}`}
        >
          {label}
        </label>
      </div>
      <div className="text-xs text-red-600 min-h-4">
        {error && <span>{error}</span>}
      </div>
    </div>
  );
}
