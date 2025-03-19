import { ChangeEvent, HTMLAttributes, type InputHTMLAttributes } from "react";
import { Input } from "./Input";

interface CpfInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChangeText?: (text: string) => void;
  error?:string;
}

export function CepInput(props: CpfInputProps) {
  return <Input mask="99999-999" label="CEP" {...props} />;
}
