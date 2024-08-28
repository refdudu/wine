import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Input } from "./Input";
import { AddressI, Option } from "@/interfaces/Address";

interface CpfInputProps {
  text: string;
  setForm: Dispatch<SetStateAction<AddressI>>;
  states: Option[];
  address: AddressI;
}
interface CpfResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
}
export function CepInput({ setForm, text, states, address }: CpfInputProps) {
  useEffect(() => {
    async function getCep() {
      if (text.length < 9 || address.id || states.length === 0) return;
      try {
        const onlyNumbers = text.replace(/\D/g, '');
        console.log("🚀 ~ getCep ~ onlyNumbers:", onlyNumbers)

        const { data } = await axios.get<CpfResponse>(
          `https://viacep.com.br/ws/${onlyNumbers}/json/`
        );
        console.log(data);
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
      } catch {}
    }
    getCep();
  }, [text, address.id, states]);

  return (
    <Input
      mask="99999-999"
      setText={(cep) => setForm((p) => ({ ...p, cep }))}
      text={text}
      label="CEP"
    />
  );
}
