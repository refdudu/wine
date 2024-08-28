import { Button } from "@/components/Button";
import { CitySelect } from "@/components/CitySelect";
import { CepInput } from "@/components/CepInput";
import { StateSelect } from "@/components/StateSelect";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { Check, Star } from "@phosphor-icons/react";
import axios from "axios";
import { useState, useEffect, Dispatch, SetStateAction, useId } from "react";
import { Input } from "@/components/Input";
import { AddressI, Option } from "@/interfaces/Address";

interface NewAddressProps {
  addAddress: (address: AddressI) => void;
  editingAddress: AddressI;
  handleCancel: () => void;
  deleteAddress: () => void;
  //   canDeleteAddress: boolean;
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
  const [states, setStates] = useState<Option[]>([]);
  useEffect(() => {
    async function get() {
      //   if (editingAddress.state) return;

      const { data } = await axios.get<StateIBGE[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const _options: Option[] = data.map((x) => ({
        key: x.sigla,
        label: x.nome,
      }));
      _options.sort((a, b) => a.label.localeCompare(b.label));
      setStates(_options);
    }
    get();
  }, []);

  useEffect(() => {
    if (editingAddress) setAddress(editingAddress);
  }, [editingAddress]);

  return (
    <>
      <header className="pb-2  mb-6 md:pb-2 flex justify-between border-b border-custom-gray-light">
        <span>Cadastrar novo endereço</span>
        {address.id && totalAddresses > 1 && (
          <button onClick={deleteAddress} className="text-red-500 text-xs">
            <span>Excluir endereço</span>
          </button>
        )}
      </header>
      <div className="flex gap-4 w-full flex-col-reverse md:flex-row">
        <div className="max-w-72 w-full flex flex-col gap-6">
          <FirstColumn address={address} setAddress={setAddress} />
        </div>
        <div className="w-full md:w-3/5 flex flex-col gap-6">
          <NewAddressForm
            address={address}
            setAddress={setAddress}
            states={states}
          />
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
          onClick={() => addAddress(address)}
          className="max-w-52 bg-custom-violet text-white"
        >
          Salvar endereço <Check />
        </Button>
      </div>
    </>
  );
}

interface NewAddressFormProps {
  setAddress: Dispatch<SetStateAction<AddressI>>;
  address: AddressI;
  states: Option[];
}
function NewAddressForm({ address, setAddress, states }: NewAddressFormProps) {
  return (
    <>
      <Input
        setText={(addressIdentify) =>
          setAddress((p) => ({ ...p, addressIdentify }))
        }
        text={address.addressIdentify}
        label="Identificação do endereço"
      />
      <Input
        setText={(recipientName) =>
          setAddress((p) => ({ ...p, recipientName }))
        }
        text={address.recipientName}
        label="Nome do destinatário"
      />
      <Input
        mask="(99) 99999-9999"
        setText={(phone) => setAddress((p) => ({ ...p, phone }))}
        text={address.phone}
        label="Telefone"
      />
      <CepInput
        address={address}
        states={states}
        setForm={setAddress}
        text={address.cep}
      />
      <StateSelect
        states={states}
        setSelectedState={(state) => setAddress((p) => ({ ...p, state }))}
        selectedState={address.state}
      />
      <CitySelect
        setSelectedCity={(city) => city && setAddress((p) => ({ ...p, city }))}
        selectedCity={address.city}
        state={address.state?.key}
      />
      <Input
        setText={(address) => setAddress((p) => ({ ...p, address }))}
        text={address.address}
        label="Endereço"
      />
      <Input
        setText={(neighborhood) => setAddress((p) => ({ ...p, neighborhood }))}
        text={address.neighborhood}
        label="Bairro"
      />
      <Input
        setText={(number) => setAddress((p) => ({ ...p, number }))}
        text={address.number}
        mask="99999999999"
        label="Número"
      />
      <Input
        setText={(complement) => setAddress((p) => ({ ...p, complement }))}
        text={address.complement}
        label="Complemento"
        beforeInputText={address.conciergeAllDay ? "Portaria 24h" : ""}
      />
    </>
  );
}
interface StateIBGE {
  sigla: string;
  nome: string;
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
          setText={(referencePoint) =>
            setAddress((p) => ({ ...p, referencePoint }))
          }
          text={address.referencePoint || ""}
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
