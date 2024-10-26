import { Button } from "@/components/Button";
import { CreditCardI } from "@/interfaces/CreditCardI";
import Image from "next/image";
import { useBuyPage } from "../BuyContext";
import MasterCardLogo from "./MastercardLogo.png";
import { Star } from "@phosphor-icons/react";

export function CreditCardComponent() {
  const { creditCards } = useBuyPage();

  return (
    <div className="flex flex-col items-center gap-4 text-center h-full w-full">
      {creditCards.length === 0 ? (
        <NoContent />
      ) : (
        <div className="flex flex-col gap-2 w-full overflow-auto items-center">
          {creditCards.map((creditCard) => (
            <CreditCardItem {...{ creditCard }} />
          ))}
        </div>
      )}
    </div>
  );
}
interface CreditCardItemProps {
  creditCard: CreditCardI;
}
function CreditCardItem({ creditCard }: CreditCardItemProps) {
  return (
    <div
      className="rounded px-8 py-4 flex flex-col gap-2 text-left h-[211px] w-[390px]"
      style={{
        backgroundImage:
          "url(https://img.wine.com.br/fenix/image/card_bg_black.png)",
      }}
    >
      <div className="flex gap-12">
        <Image width={64} src={MasterCardLogo} alt="Bandeira do cartão" />
        <div className="text-yellow-400 flex gap-2 items-center">
          <Star weight="fill" size={24} />
          <span className="text-xs">Favorito</span>
        </div>
      </div>
      <div>
        <span className="text-custom-gray-light text-xs">Número do cartão</span>
        <div className="text-white text-lg">
          <span>{creditCard.number}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <span className="text-custom-gray-light text-xs">Nome</span>
          <div className="text-white">
            <span>{creditCard.name}</span>
          </div>
        </div>
        <div>
          <span className="text-custom-gray-light text-xs">Vencimento</span>
          <div className="text-white">
            <span>{creditCard.expirationDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NoContent() {
  return (
    <>
      <span className="text-lg">
        Você não tem nenhum cartão de crédito cadastrado
      </span>
      <span className="text-sm text-custom-gray">
        Clique no botão abaixo para cadastrar seu cartão.
      </span>
      <Button
        href="credit-card"
        className="border h-10 border-custom-tannat text-custom-tannat max-w-64"
      >
        Cadastrar cartão
      </Button>
    </>
  );
}
