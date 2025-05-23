import { Button } from "@/components/Button";
import { CitySelect } from "@/components/CitySelect";
import { CepInput } from "@/components/CepInput";
import { StateSelect } from "@/components/StateSelect";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { Check, Star } from "@phosphor-icons/react";
import {
  useState,
  useEffect,
  type ButtonHTMLAttributes,
  useCallback,
} from "react";
import { Input } from "@/components/Input";
import type { AddressI } from "@/interfaces/AddressI";
import type { Option } from "@/interfaces/OptionI";
import { Spin } from "@/components/Spin";

import * as Yup from "yup";
import { useQuery } from "react-query";
import { StatesService } from "@/services/StatesService";
import { BuyPageProvider, useBuyPage } from "../BuyContext";
import { baseAddress } from "./useBuyAddressPage";
import type { NextPageWithLayout } from "@/pages/_app";
import { BuyDefaultHeader } from "../BuyDefaultHeader";
import { addressValidationSchema } from "@/validation/address";
import { useRouter } from "next/router";
import { GetFieldsErrors } from "@/utils/errors/GetFieldsErrors";

const validateAddress = async (address: AddressI) => {
  try {
    await addressValidationSchema.validate(address, { abortEarly: false });
    return null;
  } catch (e) {
    if (e instanceof Yup.ValidationError) {
      return GetFieldsErrors(e);
    }
    console.error(e); // Handle unexpected errors
    return { unexpected: "An unexpected error occurred" };
  }
};

export const NewAddressPage: NextPageWithLayout = () => {
  const { addAddress, editingAddress, deleteAddress, addresses } = useBuyPage();

  const [address, setAddress] = useState(editingAddress || baseAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleAddAddress = useCallback(async () => {
    setIsLoading(true);
    const errors = await validateAddress(address);
    if (errors) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }
    try {
      await addAddress(address);
    } catch (e) {
      console.error(e); // Handle unexpected errors
    }
    setIsLoading(false);
  }, [address, addAddress]);

  function handleChange(_object: object) {
    setAddress((prev) => ({ ...prev, ..._object }));
  }

  useEffect(() => {
    setAddress(editingAddress || baseAddress);
  }, [editingAddress]);

  return (
    <>
      <BuyDefaultHeader
        {...{
          //   action: address.id && addresses.length > 1 && (
          action: address.id && (
            <div>
              <DeleteAddress {...{ deleteAddress }} />
            </div>
          ),
          title: address.id ? "Editar endereço" : "Cadastrar novo endereço",
        }}
      />

      <div className="flex gap-4 w-full flex-col-reverse md:flex-row mt-6">
        <div className="lg:max-w-72 w-full flex flex-col gap-6">
          <FirstColumn {...{ address, errors, handleChange, addresses }} />
        </div>
        <div className="w-full md:w-3/5">
          <NewAddressForm {...{ address, errors, handleChange }} />
        </div>
      </div>
      <footer className="flex mt-4 py-4 gap-4 lg:gap-8 justify-end flex-col lg:flex-row border-t border-t-custom-line">
        {addresses.length > 0 && (
          <Button
            href="address"
            styleType="default"
            className="lg:max-w-32 h-10"
          >
            Cancelar
          </Button>
        )}
        <Button
          isLoading={isLoading}
          icon={<Check />}
          onClick={handleAddAddress}
          styleType="primary-full"
          className="lg:max-w-52 h-10"
        >
          Salvar endereço
        </Button>
      </footer>
    </>
  );
};

NewAddressPage.getLayout = (page: React.ReactNode) => (
  <BuyPageProvider>{page}</BuyPageProvider>
);

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  deleteAddress: () => Promise<void>;
}
function DeleteAddress({ deleteAddress, ...props }: DeleteButtonProps) {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    setIsLoading(true);
    try {
      await deleteAddress();
      replace("address");
      return;
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }
  return (
    <Button
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
    </Button>
  );
}

interface NewAddressFormProps {
  handleChange: (obj: object) => void;
  address: AddressI;
  errors: Record<string, string>;
}

function NewAddressForm({
  address,
  handleChange,
  errors,
}: NewAddressFormProps) {
  const { data: states } = useQuery<Option[]>({
    queryFn: StatesService.getState,
    queryKey: ["states"],
  });

  async function onChangeCEP(cep: string) {
    handleChange({ cep });

    if (cep.length !== 9 || states?.length === 0) return;

    try {
      const _form = await StatesService.getCep(cep, states || []);
      if (!_form) return;
      handleChange(_form);
    } catch (e) {
      console.error(e); // Handle unexpected errors
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <Input
        error={errors.addressIdentify}
        value={address.addressIdentify}
        onChangeText={(addressIdentify) => handleChange({ addressIdentify })}
        label="Identificação do endereço"
      />
      <Input
        error={errors.recipientName}
        onChangeText={(recipientName) => handleChange({ recipientName })}
        value={address.recipientName}
        label="Nome do destinatário"
      />
      <Input
        error={errors.phone}
        onChangeText={(phone) => handleChange({ phone })}
        value={address.phone}
        mask="(__) _____-____"
        label="Telefone"
      />
      <CepInput
        error={errors.cep}
        onChangeText={onChangeCEP}
        value={address.cep}
      />
      <StateSelect
        error={errors.state}
        states={states || []}
        setSelectedState={(state) => handleChange({ state })}
        selectedState={address.state}
      />
      <CitySelect
        setSelectedCity={(city) => handleChange({ city })}
        selectedCity={address.city}
        state={address.state?.key}
        error={errors.city}
      />
      <Input
        error={errors.address}
        onChangeText={(address) => handleChange({ address })}
        value={address.address}
        label="Endereço"
      />
      <Input
        error={errors.neighborhood}
        onChangeText={(neighborhood) => handleChange({ neighborhood })}
        value={address.neighborhood}
        label="Bairro"
      />
      <Input
        error={errors.number}
        onChangeText={(number) => handleChange({ number })}
        value={address.number}
        mask="____"
        label="Número"
      />
      <Input
        error={errors.complement}
        onChangeText={(complement) => handleChange({ complement })}
        value={address.complement}
        label="Complemento"
        beforeInputText={address.conciergeAllDay ? "Portaria 24h" : ""}
      />
    </div>
  );
}

interface FirstColumnProps extends NewAddressFormProps {
  addresses: AddressI[];
}
function FirstColumn({ address, handleChange, addresses }: FirstColumnProps) {
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
            addresses?.length > 0 && handleChange({ isFavorite })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-custom-gray">
          Sua portaria funciona 24 horas?
        </span>
        <ToggleSwitch
          isChecked={address.conciergeAllDay}
          setIsChecked={(conciergeAllDay) => handleChange({ conciergeAllDay })}
        />
      </div>
      <div>
        <Input
          onChangeText={(referencePoint) => handleChange({ referencePoint })}
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
  const _cep = cep.replace(/\D/g, "");
  if (_cep.length < 5) return _cep;
  return `${_cep.substring(0, 5)}-${_cep.substring(5, 8)}`;
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
