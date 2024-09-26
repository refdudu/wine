import axios from "axios";
import { Dispatch, HTMLAttributes, SetStateAction, useEffect } from "react";
import { Input } from "./Input";
import { AddressI, Option } from "@/interfaces/Address";
import { StatesService } from "@/services/StatesService";

interface CpfInputProps extends HTMLAttributes<HTMLInputElement> {
  onChangeText?: (text: string) => void;
}

export function CepInput({ onChange, onChangeText }: CpfInputProps) {
  return (
    <Input
      mask="99999-999"
      onChange={(cep) =>
        setForm((p) => ({ ...p, cep: cep.currentTarget.value }))
      }
      value={text}
      label="CEP"
    />
  );
}
