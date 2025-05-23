import { useEffect, useMemo, useState } from "react";
import { Select } from "./Select";
import { normalizeString } from "@/utils/normalizeString";
import type { Option } from "@/interfaces/OptionI";

interface StateSelectProps {
  selectedState: Option | null;
  setSelectedState: (state: Option | null) => void;
  states: Option[];
  error?: string;
}
export function StateSelect({
  selectedState,
  setSelectedState,
  states: options,
  error,
}: StateSelectProps) {
  const [text, setText] = useState("");

  function handelSelectState(option: Option | null) {
    setText("");
    setSelectedState(option);
  }
  const filterOptions = useMemo(() => {
    return options.filter((x) =>
      normalizeString(x.label).includes(normalizeString(text))
    );
  }, [text, options]);

  return (
    <Select
      label="Estado"
      selectedOption={selectedState}
      setSelectedOption={handelSelectState}
      options={filterOptions}
      placeholder="Selecione um estado"
      error={error}
      {...{
        text,
        setText,
      }}
    />
  );
}
