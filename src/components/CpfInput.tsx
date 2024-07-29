import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Input } from "./Input";
import { Address, Option } from "@/interfaces/Address";

interface CpfInputProps {
  text: string;
  setForm: Dispatch<SetStateAction<Address>>;
  states: Option[];
  address: Address;
}
interface CpfResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
}
export function CpfInput({ setForm, text, states, address }: CpfInputProps) {
  useEffect(() => {
    async function getCep() {
      console.log(address.id);
      if (text?.length !== 8 || address.id || states.length === 0) return;
      const { data } = await axios.get<CpfResponse>(
        `https://viacep.com.br/ws/${text}/json/`
      );
      const state = states.find((x) => x.key === data.uf) || null;
      let _form = {
        address: data.logradouro,
        neighborhood: data.bairro,
        city: {
          key: data.ibge,
          label: data.localidade,
        },
        state,
      };
      setForm((p) => ({ ...p, ..._form }));
    }
    getCep();
  }, [text, address.id, states]);

  return (
    <Input
      setText={(cep) => setForm((p) => ({ ...p, cep }))}
      text={text}
      label="CEP"
    />
  );
}
