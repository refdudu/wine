import { Button } from "@/components/Button";
import type { CreditCardI } from "@/interfaces/CreditCardI";
import Image from "next/image";
import { useBuyPage } from "../BuyContext";
import MasterCardLogo from "../MastercardLogo.png";
import { Star, Trash } from "@phosphor-icons/react";
import { useState } from "react";

export function CreditCardComponent() {
  const { creditCards } = useBuyPage();

  return (
    <div className="flex flex-col items-center gap-4 text-center h-full w-full">
      {creditCards.length === 0 ? (
        <NoContent />
      ) : (
        <div className="flex flex-col gap-2 w-full overflow-auto items-center">
          {creditCards.map((creditCard) => (
            <CreditCardItem key={creditCard.id} {...{ creditCard }} />
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
  const [isDeleting, setIsDeleting] = useState(false);
  const { selectedCreditCardId, setSelectedCreditCardId, deleteCreditCard } =
    useBuyPage();

  async function handleDelete() {
    setIsDeleting(true);
    await deleteCreditCard(creditCard.id || "");
    setIsDeleting(false);
  }
  return (
    <div
      className="rounded px-8 py-4 flex flex-col gap-2 text-left h-[211px] w-[390px]"
      style={{
        backgroundImage:
          "url(https://img.wine.com.br/fenix/image/card_bg_black.png)",
      }}
    >
      <div className="flex gap-4 flex-1">
        <Image width={64} src={MasterCardLogo} alt="Bandeira do cartão" />
        <div className="text-yellow-400 flex-1 flex justify-between items-center">
          {selectedCreditCardId === creditCard.id ? (
            <div className="flex gap-2 items-center">
              <Star weight="fill" size={24} />
              <span className="text-xs">Selecionado</span>
            </div>
          ) : (
            <Button
              onClick={() => setSelectedCreditCardId(creditCard.id || "")}
            >
              Selecionar
            </Button>
          )}
          <Button
            isLoading={isDeleting}
            spinColor="rgb(239 68 68)"
            className="text-red-500"
            icon={<Trash className="text-red-500" />}
            onClick={handleDelete}
          >
            Deletar
          </Button>
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
