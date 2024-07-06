import { BuyHeader } from "./BuyHeader";
import { useState } from "react";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { Input } from "@/components/Input";
import { Option } from "@/components/Select";
import { StateSelect } from "@/components/StateSelect";
import { CitySelect } from "@/components/CitySelect";

export function BuyPage() {
  return (
    <div className="flex flex-col h-screen">
      <BuyHeader />

      <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
        <main className="max-w-[1120px] flex mx-auto">
          <NewAddress />
          <div className="w-1/5">pagamento</div>
        </main>
      </div>
    </div>
  );
}
interface Form {
  state: Option;
  city: Option;
}

function NewAddress() {
  const [form, setForm] = useState({} as Form);

  return (
    <div className="w-4/5">
      <header>
        <span>Cadastrar novo endereço</span>
      </header>
      <div className="flex gap-4 w-full">
        <FirstColumn />
        <div className="w-3/5 flex flex-col gap-6">
          <Input label="Identificação do endereço" />
          <Input label="Nome do destinatário" />
          <StateSelect
            setSelectedState={(state) =>
              state && setForm((p) => ({ ...p, state }))
            }
            selectedState={form.state}
          />
          <CitySelect
            setSelectedCity={(city) => city && setForm((p) => ({ ...p, city }))}
            selectedCity={form.city}
            state={form.state?.key}
          />
          <Input label="CEP" />
          <Input label="Endereço" />
          <Input label="Número" />
          <Input label="Complemento" />
          <Input label="Bairro" />
          <Input label="Telefone" />
        </div>
      </div>
    </div>
  );
}
function FirstColumn() {
  return (
    <div className="max-w-72 w-full flex flex-col gap-6">
      <LocationCard />
      <div className="flex flex-col gap-2">
        <span className="text-xs text-custom-gray">
          Deseja tornar esse endereço o seu favorito?
        </span>
        <ToggleSwitch />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-custom-gray">
          Sua portaria funciona 24 horas?
        </span>
        <ToggleSwitch />
      </div>
      <div>
        <Input label="Ponto de referência" />
      </div>
    </div>
  );
}
function LocationCard() {
  return (
    <div className="flex flex-col border border-custom-violet">
      <div className="h-10 bg-custom-violet" />
      <div className="flex flex-col p-4">
        <span className="text-xl">Casa</span>
        <span>
          Rua Emilio Tesche, 782, Oriental - Três de Maio, RS - CEP 98910-000
        </span>
      </div>
    </div>
  );
}
