import { Layout } from "@/components/Layout";
import { BuyHeader } from "./BuyHeader";

export function BuyPage() {
  return (
    <div className="flex flex-col h-screen">
      <BuyHeader />

      <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
        <main className="max-w-[1120px] flex mx-auto">
          <div>
            <div>
              <span>Cadastrar novo endereço</span>
            </div>
            <div>
              <FirstColumn />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
function FirstColumn() {
  return (
    <div>
      <LocationCard />
    </div>
  );
}
function LocationCard() {
  return (
    <div className="flex flex-col">
      <div />
      <span>Casa</span>
      <span>
        Rua Emilio Tesche, 782, Oriental - Três de Maio, RS - CEP 98910-000
      </span>
    </div>
  );
}
