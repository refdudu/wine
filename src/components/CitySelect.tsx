import { useEffect, useMemo, useState } from "react";
import { Select } from "./Select";
import axios from "axios";
import { normalizeString } from "@/utils/normalizeString";
import { Option } from "@/interfaces/Address";
import { StatesService } from "@/services/StatesService";

interface StateSelectProps {
  selectedCity: Option | null;
  setSelectedCity: (city: Option | null) => void;
  state?: string;
  error?: string;
}
export function CitySelect({
  selectedCity,
  setSelectedCity,
  state,
  error
}: StateSelectProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    async function get() {
      if (!state) return;
      const _options = await StatesService.getCities(state);
      setOptions(_options);
    }
    get();
  }, [state]);

  function handelSelectState(option: Option | null) {
    setText("");
    setSelectedCity(option);
  }
  const filterOptions = useMemo(() => {
    return options.filter((x) =>
      normalizeString(x.label).includes(normalizeString(text))
    );
  }, [text, options]);

  return (
    <Select
      selectedOption={selectedCity}
      setSelectedOption={handelSelectState}
      options={filterOptions}
      label="Cidade"
      disabled={!state}
      placeholder={
        !state ? "Selecione um estado primeiro" : "Selecione uma cidade"
      }
      error={error}
      {...{ text, setText }}
    />
  );
}
