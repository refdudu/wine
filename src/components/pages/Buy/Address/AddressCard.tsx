import { AddressI } from "@/interfaces/Address";
import { PencilLine, User } from "@phosphor-icons/react";
import { AddressText } from "./NewAddress";
import classNames from "classnames";

interface AddressCardProps {
  setIsEditing: () => void;
  address: AddressI;
  isSelected: boolean;
  selectAddress: () => void;
}
export function AddressCard({
  setIsEditing,
  address,
  isSelected,
  selectAddress,
}: AddressCardProps) {
  return (
    <div className="w-full border border-custom-gray-light">
      <header
        className={`${classNames({
          "bg-custom-violet": isSelected,
        })} w-full text-white h-8 flex items-center px-4`}
      >
        {isSelected && "Selecionado"}
      </header>
      <div className="p-4">
        <div className="flex items-center text-xl justify-between">
          <div className="flex gap-2 items-center">
            <span>{address.addressIdentify}</span>
            {!isSelected && (
              <button
                onClick={selectAddress}
                className="text-custom-violet text-sm"
              >
                Selecionar
              </button>
            )}
          </div>
          <button onClick={setIsEditing}>
            <PencilLine color="#B6116E" />
          </button>
        </div>
        <div className="flex items-center text-custom-gray-light font-light gap-1">
          <User />
          {address.addressIdentify}
        </div>
        <AddressText address={address} />
      </div>
    </div>
  );
}
