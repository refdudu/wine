import { Layout } from "@/components/Layout";
import { BuyHeader } from "./BuyHeader";

export function BuyPage() {
  return (
    <div className="flex flex-col h-screen">
      <BuyHeader />

      <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
        <main className="max-w-[1120px] flex mx-auto">
          <NewAddress />
          <div className="flex-2">pagamento</div>
        </main>
      </div>
    </div>
  );
}
function NewAddress() {
  return (
    <div className="flex-3">
      <header>
        <span>Cadastrar novo endereço</span>
      </header>
      <div className="flex">
        <FirstColumn />
        <div className="flex-2">campos</div>
      </div>
    </div>
  );
}
function FirstColumn() {
  return (
    <div className="flex-1 max-w-72">
      <LocationCard />
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
