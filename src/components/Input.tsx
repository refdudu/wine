import classNames from "classnames";
import { ChangeEvent, useId } from "react";
import InputMask from "react-input-mask";

interface InputProps {
  label: string;
  beforeInputText?: string;
  mask?: string;
  //   text: string;
  //   setText: (text: string) => void;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}
export function Input({
  label,
  beforeInputText,
  mask,
  value,
  ...props
}: InputProps) {
  const id = useId();
  //   const [text, setText] = useState<string>("");
  const hasText = Boolean(value);
  const inputProps = {
    autoComplete: "one-time-code",
    id,
    className: `flex-1 peer bg-transparent border-b border-b-custom-gray-light outline-none py-2 px-1 focus:border-b-custom-violet ${classNames(
      {
        "border-b-custom-violet": hasText,
      }
    )}`,
    value,
    ...props,
  };

  return (
    <div className="relative flex w-full min">
      {beforeInputText && (
        <div className="items-center justify-center flex border-b border-b-custom-gray-light px-1">
          <span className="">Portaria 24h</span>
        </div>
      )}
      {mask ? (
        <InputMask maskChar="" mask={mask} {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}
      <label
        htmlFor={id}
        className={`absolute left-1  transition-all peer-focus:-top-3 peer-focus:-translate-y-0 peer-focus:text-xs ${classNames(
          {
            "-top-3": hasText || beforeInputText,
            "-translate-y-0": hasText || beforeInputText,
            "text-xs": hasText || beforeInputText,
            "-translate-y-1/2": !hasText && !beforeInputText,
            "top-1/2": !hasText && !beforeInputText,
          }
        )}`}
      >
        {label}
      </label>
    </div>
  );
}
