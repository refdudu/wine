import { Layout } from "@/components/Layout";
import { BuyHeader } from "./BuyHeader";

export function BuyPage() {
  return (
    <div className="flex flex-col h-screen">
      <BuyHeader />

      <main>
        <div>
          <span>Cadastrar novo endereço</span>
        </div>
        <div>
          <div>
            <div>
                <div/>
                <span>Casa</span>
                <span>Rua Emilio Tesche, 782, Oriental - Três de Maio, RS - CEP 98910-000</span>
            </div>
          </div>
          <div></div>
        </div>
      </main>
    </div>  
  );
}
