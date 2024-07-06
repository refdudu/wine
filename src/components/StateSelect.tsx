import { useEffect, useMemo, useState } from "react";
import { Option, Select } from "./Select";
import axios from "axios";
import { normalizeString } from "@/utils/normalizeString";

interface StateIBGE {
  sigla: string;
  nome: string;
}
interface StateSelectProps {
  selectedState: Option;
  setSelectedState: (state: Option | null) => void;
}
export function StateSelect({
  selectedState,
  setSelectedState,
}: StateSelectProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [text, setText] = useState("");
  useEffect(() => {
    async function get() {
      const { data } = await axios.get<StateIBGE[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const _options: Option[] = data.map((x) => ({
        key: x.sigla,
        label: x.nome,
      }));
      _options.sort((a, b) => a.label.localeCompare(b.label));
      setOptions(_options);
    }
    get();
  }, []);
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
      {...{
        text,
        setText,
      }}
    />
  );
}
