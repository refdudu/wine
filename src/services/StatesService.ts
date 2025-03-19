import type { Option } from "@/interfaces/Address";
import axios from "axios";

export const StatesService = {
  async getState() {
    const { data } = await axios.get<StateIBGE[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    const _options: Option[] = data.map((x) => ({
      key: x.sigla,
      label: x.nome,
    }));
    _options.sort((a, b) => a.label.localeCompare(b.label));
    return _options;
  },
  async getCities(state: string) {
    const { data } = await axios.get<CityIBGE[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`
    );
    const _options: Option[] = data.map((x) => ({
      key: x.id,
      label: x.nome,
    }));
    _options.sort((a, b) => a.label.localeCompare(b.label));
    return _options;
  },
  async getCep(cep: string, states: Option[]) {
    const onlyNumbers = cep.replace(/\D/g, "");
    const { data } = await axios.get<CpfResponse>(
      `https://viacep.com.br/ws/${onlyNumbers}/json/`
    );
    const state = states.find((x) => x.key === data.uf) || null;
    if (!state) return undefined;

    const _form = {
      address: data.logradouro.length > 0 ? data.logradouro : undefined,
      neighborhood: data.bairro.length > 0 ? data.bairro : undefined,
      city: {
        key: data.ibge,
        label: data.localidade,
      },
      state,
      cep,
    };
    return Object.fromEntries(Object.entries(_form).filter((x) => Boolean(x[1])));
  },
};
interface CityIBGE {
  id: string;
  nome: string;
}
interface StateIBGE {
  sigla: string;
  nome: string;
}
interface CpfResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
}
