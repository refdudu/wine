import { Option } from "@/interfaces/Address";
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
  async getCities(state:string) {
    const { data } = await axios.get<CityIBGE[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`
    );
    const _options: Option[] = data.map((x) => ({
      key: x.id,
      label: x.nome,
    }));
    _options.sort((a, b) => a.label.localeCompare(b.label));
    return _options
  },
  async getCep(text: string, states: Option[]) {
    const onlyNumbers = text.replace(/\D/g, "");
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
