import { useEffect, useMemo, useState } from "react";
import { Option, Select } from "./Select";
import axios from "axios";
import { normalizeString } from "@/utils/normalizeString";

interface CityIBGE {
  id: string;
  nome: string;
}
interface StateSelectProps {
  selectedCity: Option | null;
  setSelectedCity: (city: Option | null) => void;
  state?: string;
}
export function CitySelect({
  selectedCity,
  setSelectedCity,
  state,
}: StateSelectProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!state) return;

    async function get() {
      const { data } = await axios.get<CityIBGE[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`
      );
      const _options: Option[] = data.map((x) => ({
        key: x.id,
        label: x.nome,
      }));
      _options.sort((a, b) => a.label.localeCompare(b.label));
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
      {...{ text, setText }}
    />
  );
}
