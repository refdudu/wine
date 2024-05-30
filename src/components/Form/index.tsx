import classNames from "classnames";
import { HTMLAttributes, LabelHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

// interface FormProps {
//   register: UseFormRegisterReturn<string>;
//   error?: string;
// }
// export function Form({ register, error }: FormProps) {
//   return (
//     <div className="flex flex-col bg-white p-4 relative h-32">
//       <input
//         id="name"
//         className="border-b border-custom-gray focus:border-custom-tannat p-2 outline-none peer"
//         {...register}
//       />
//       <label
//         htmlFor="name"
//         className="-translate-y-8 translate-x-2 peer-focus:-translate-y-14 peer-focus:text-xs peer-focus:translate-x-0 transition duration-300"
//       >
//         Nome:
//       </label>
//       {error && <span>{error}</span>}
//     </div>
//   );
// }

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
