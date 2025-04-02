import classNames from "classnames";
import type { HTMLAttributes, LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  hasValue: boolean;
}
function Label({ hasValue, ...props }: LabelProps) {
  return (
    <label
      className={`${classNames({
        "translate-y-2": !hasValue,
        "-translate-y-2": hasValue,
        "text-xs": hasValue,
      })} absolute peer-focus:-translate-y-2 peer-focus:text-xs
            peer-focus:translate-x-0 transition-all  duration-300 ${
              props.className
            }`}
      {...props}
    />
  );
}

interface InputProps extends HTMLAttributes<HTMLInputElement> {}

function Input(props: InputProps) {
  return (
    <input
      className={`border-b border-custom-gray focus:border-custom-tannat p-2 outline-none peer ${props.className}`}
      {...props}
    />
  );
}
export const Form = {
  Label,
  Input,
};
