import classNames from "classnames";
import { ReactNode, useState } from "react";

interface ToggleSwitchProps {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
}

export function ToggleSwitch({ isChecked, setIsChecked }: ToggleSwitchProps) {
  //   const [isChecked, setIsChecked] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsChecked(!isChecked)}
      className="max-w-20 bg-custom-background-light border border-custom-border flex items-center justify-center px-2 py-1 cursor-pointer"
    >
      <div
        className={`transition-all duration-300 select-none px-1 rounded-sm ${classNames(
          {
            "ml-[100%]": isChecked,
            "-ml-[100%]": !isChecked,
            "-translate-x-1/2": isChecked,
            "translate-x-1/2": !isChecked,
            "bg-custom-violet": isChecked,
            "bg-custom-gray-light": !isChecked,
          }
        )}`}
      >
        <span className="pointer-events-none text-white">
          {isChecked ? "Sim" : "Não"}
        </span>
      </div>
    </button>
  );
}

// export function ToggleSwitch(){
//     return(

//     )
// }
