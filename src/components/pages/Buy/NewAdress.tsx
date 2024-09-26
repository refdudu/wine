import { Button } from "@/components/Button";
import { CitySelect } from "@/components/CitySelect";
import { CepInput } from "@/components/CepInput";
import { StateSelect } from "@/components/StateSelect";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { Check, Star } from "@phosphor-icons/react";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ButtonHTMLAttributes,
} from "react";
import { Input } from "@/components/Input";
import { AddressI, Option } from "@/interfaces/Address";
import { Spin } from "@/components/Spin";

import * as Yup from "yup";
import { useQuery } from "react-query";
import { StatesService } from "@/services/StatesService";

interface NewAddressProps {
  addAddress: (address: AddressI) => Promise<void>;
  editingAddress: AddressI;
  handleCancel: () => void;
  deleteAddress: () => Promise<void>;
  totalAddresses: number;
}
export function NewAddress({
  addAddress,
  editingAddress,
  handleCancel,
  deleteAddress,
  totalAddresses,
}: NewAddressProps) {
  const [address, setAddress] = useState(editingAddress);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChangeAddress() {
    setIsLoading(true);
    await addAddress(address);
    setIsLoading(false);
  }

  useEffect(() => {
    if (editingAddress) setAddress(editingAddress);
  }, [editingAddress]);

  return (
    <>
      <header className="pb-2  mb-6 md:pb-2 flex justify-between border-b border-custom-gray-light">
        <span>Cadastrar novo endereço</span>
        {address.id && totalAddresses > 1 && (
          <DeleteAddress {...{ deleteAddress }} />
        )}
      </header>
      <div className="flex gap-4 w-full flex-col-reverse md:flex-row">
        <div className="max-w-72 w-full flex flex-col gap-6">
          <FirstColumn address={address} setAddress={setAddress} />
        </div>
        <div className="w-full md:w-3/5">
          <NewAddressForm address={address} setAddress={setAddress} />
        </div>
      </div>
      <div className="flex py-4 gap-8 justify-end ">
        {totalAddresses > 0 && (
          <Button
            onClick={handleCancel}
            className="max-w-32 h-10  bg-white border text-custom-gray-light border-custom-gray-light"
          >
            Cancelar
          </Button>
        )}
        <Button
          isLoading={isLoading}
          icon={<Check />}
          onClick={handleChangeAddress}
          className="max-w-52 bg-custom-violet text-white"
        >
          Salvar endereço
        </Button>
      </div>
    </>
  );
}
interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  deleteAddress: () => Promise<void>;
}
function DeleteAddress({ deleteAddress, ...props }: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    setIsLoading(true);
    await deleteAddress();
    setIsLoading(false);
  }
  return (
    <button
      onClick={handleDelete}
      className="text-red-500 text-xs flex gap-2"
      {...props}
    >
      <span>Excluir endereço</span>
      {isLoading && (
        <Spin
          color="rgb(239 68 68 / var(--tw-text-opacity))"
          size={16}
          borderWidth={3}
        />
      )}
    </button>
  );
}

interface NewAddressFormProps {
  setAddress: Dispatch<SetStateAction<AddressI>>;
  address: AddressI;
}
const validationSchema = Yup.object().shape({
  addressIdentify: Yup.string().required(
    "O campo Identificação do Endereço é obrigatório"
  ),
  recipientName: Yup.string().required(
    "O campo Nome do Destinatário é obrigatório"
  ),
  phone: Yup.string().required("O campo Telefone é obrigatório"),
  cep: Yup.string().required("O campo CEP é obrigatório"),
  state: Yup.string().required("O campo Estado é obrigatório"),
  city: Yup.string().required("O campo Cidade é obrigatório"),
  neighborhood: Yup.string().required("O campo Bairro é obrigatório"),
  number: Yup.string().required("O campo Número é obrigatório"),
  complement: Yup.string().required("O campo Complemento é obrigatório"),
  address: Yup.string().required("O campo Endereço é obrigatório"),
});

function NewAddressForm({ address, setAddress }: NewAddressFormProps) {
  const { data: states, isFetching } = useQuery<Option[]>({
    queryFn: StatesService.getState,
    queryKey: ["states"],
  });
  function handleChange(_object: object) {
    setAddress((p) => ({ ...p, ..._object }));
  }

  return (
    <div className="flex flex-col gap-6">
      <Input
        value={address.addressIdentify}
        onChangeText={(addressIdentify) => handleChange({ addressIdentify })}
        label="Identificação do endereço"
      />
      <Input
        onChangeText={(recipientName) => handleChange({ recipientName })}
        value={address.recipientName}
        label="Nome do destinatário"
      />
      <Input
        onChangeText={(phone) => handleChange({ phone })}
        value={address.phone}
        mask="(99) 99999-9999"
        label="Telefone"
      />
      <CepInput setForm={setAddress} text={address.cep} />
      <StateSelect
        states={states || []}
        setSelectedState={(state) => setAddress((p) => ({ ...p, state }))}
        selectedState={address.state}
      />
      <CitySelect
        setSelectedCity={(city) => city && setAddress((p) => ({ ...p, city }))}
        selectedCity={address.city}
        state={address.state?.key}
      />
      <Input label="Endereço" />
      <Input label="Bairro" />
      <Input mask="99999999999" label="Número" />
      <Input
        label="Complemento"
        beforeInputText={address.conciergeAllDay ? "Portaria 24h" : ""}
      />
    </div>
  );
}

interface FirstColumnProps {
  setAddress: Dispatch<SetStateAction<AddressI>>;
  address: AddressI;
}
function FirstColumn({ address, setAddress }: FirstColumnProps) {
  return (
    <>
      <div className="hidden md:flex flex-col border border-custom-violet">
        <LocationCard address={address} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-custom-gray">
          Deseja tornar esse endereço o seu favorito?
        </span>
        <ToggleSwitch
          isChecked={address.isFavorite}
          setIsChecked={(isFavorite) =>
            setAddress((p) => ({ ...p, isFavorite }))
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-custom-gray">
          Sua portaria funciona 24 horas?
        </span>
        <ToggleSwitch
          isChecked={address.conciergeAllDay}
          setIsChecked={(conciergeAllDay) =>
            setAddress((p) => ({ ...p, conciergeAllDay }))
          }
        />
      </div>
      <div>
        <Input
          onChangeText={(referencePoint) =>
            setAddress((p) => ({ ...p, referencePoint }))
          }
          value={address.referencePoint}
          label="Ponto de referência"
        />
      </div>
    </>
  );
}
interface LocationCardProps {
  address: AddressI;
}
function LocationCard({ address }: LocationCardProps) {
  return (
    <>
      <div className="h-10 bg-custom-violet">
        {address.isFavorite && (
          <div className="flex gap-2 items-center p-2 text-white">
            <Star weight="fill" fill="#ffb400" />
            Favorito
          </div>
        )}
      </div>
      <div className="flex flex-col p-4">
        <span className="text-xl">{address.addressIdentify}</span>
        <AddressText address={address} />
      </div>
    </>
  );
}
function formatCEP(cep: string) {
  cep = cep.replace(/\D/g, "");
  if (cep.length < 5) return cep;
  return cep.substring(0, 5) + "-" + cep.substring(5, 8);
}
interface AddressTextProps {
  address: AddressI;
}
export function AddressText({ address }: AddressTextProps) {
  return (
    <span>
      {address.address && `${address.address},`}{" "}
      {address.number && `${address.number},`}{" "}
      {address.neighborhood && `${address.neighborhood} -`}{" "}
      {address.city && `${address.city.label},`}{" "}
      {address.state && `${address.state.key} -`}{" "}
      {address.cep && `CEP ${formatCEP(address.cep)}`}
    </span>
  );
}
