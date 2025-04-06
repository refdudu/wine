import { ChangeEvent, HTMLAttributes, type InputHTMLAttributes } from "react";
import { Input } from "./Input";

interface CpfInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChangeText?: (text: string) => void;
  error?:string;
}

export function CepInput(props: CpfInputProps) {
  return <Input mask="_____-___" label="CEP" {...props} />;
}
