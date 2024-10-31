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

interface HeaderProps {
  isSelected: boolean;
}

interface ContentProps {
  address: AddressI;
  isSelected: boolean;
  selectAddress: () => void;
  setIsEditing: () => void;
}

interface AddressHeaderProps {
  address: AddressI;
  isSelected: boolean;
  selectAddress: () => void;
  setIsEditing: () => void;
}

interface AddressDetailsProps {
  address: AddressI;
}

export function AddressCard({
  setIsEditing,
  address,
  isSelected,
  selectAddress,
}: AddressCardProps) {
  return (
    <div className="w-full border border-custom-gray-light">
      <Header isSelected={isSelected} />
      <Content
        address={address}
        isSelected={isSelected}
        selectAddress={selectAddress}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}

function Header({ isSelected }: HeaderProps) {
  return (
    <header
      className={classNames("w-full text-white h-8 flex items-center px-4", {
        "bg-custom-violet": isSelected,
      })}
    >
      {isSelected && "Selecionado"}
    </header>
  );
}

function Content({
  address,
  isSelected,
  selectAddress,
  setIsEditing,
}: ContentProps) {
  return (
    <div className="p-4 flex flex-col justify-center">
      <AddressHeader
        address={address}
        isSelected={isSelected}
        selectAddress={selectAddress}
        setIsEditing={setIsEditing}
      />
      <AddressDetails address={address} />
    </div>
  );
}

function AddressHeader({
  address,
  isSelected,
  selectAddress,
  setIsEditing,
}: AddressHeaderProps) {
  return (
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
  );
}

function AddressDetails({ address }: AddressDetailsProps) {
  return (
    <>
      <div className="flex items-center text-custom-gray-light font-light gap-1">
        <User />
        {address.addressIdentify}
      </div>
      <AddressText address={address} />
    </>
  );
}
