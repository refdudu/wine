import { Check, CreditCard, Icon, PixLogo } from "@phosphor-icons/react";
import { BuyPageProvider } from "../BuyContext";
import { RadioInput } from "@/components/RadioInput";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import * as Yup from "yup";

const paymentMethods = [
  {
    label: "Cartão de crédito",
    value: "credit-card",
    icon: CreditCard,
  },
  {
    label: "Pix",
    value: "pix",
    icon: PixLogo,
  },
];

export function PaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit-card");

  const [editingCreditCard, setEditingCreditCard] =
    useState<CreditCardI | null>(null);

  return (
    <BuyPageProvider>
      <Header />
      <main className="mt-4 min-h-96 flex gap-8">
        <div className="flex flex-col gap-2 border-custom-gray-light border max-w-60 w-full uppercase">
          {paymentMethods.map(({ icon: Icon, label, value }) => (
            <div className="border-custom-gray-light text-custom-gray border-b p-2 w-full">
              <RadioInput
                value={value}
                checked={value === selectedPaymentMethod}
                key={value}
                name="between_the_price"
                onChange={() => setSelectedPaymentMethod(value)}
              >
                <div className="flex justify-between w-full">
                  <span>{label}</span>
                  <Icon size={24} />
                </div>
              </RadioInput>
            </div>
          ))}
        </div>
        <div className="h-full w-full flex justify-center items-center">
          <PaymentMethod
            paymentMethod={selectedPaymentMethod}
            createCreditCard={() => setEditingCreditCard(_creditCard)}
            editingCreditCard={editingCreditCard}
          />
        </div>
      </main>
      <Footer />
    </BuyPageProvider>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between border-b pb-4 border-b-custom-gray-light text-custom-gray">
      <div className="flex gap-2 items-center">
        <CreditCard size={24} />
        <span className="text-xl">Escolha sua forma de pagamento</span>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="flex justify-between w-full mt-8 border-t pt-4 border-t-custom-gray-light">
      <Button
        href="address"
        className="bg-white border border-custom-gray max-w-48"
      >
        Voltar
      </Button>
      <Button
        href="payment"
        icon={<Check />}
        className="bg-custom-green text-white max-w-64"
      >
        Finalizar pedido
      </Button>
    </footer>
  );
}

interface PaymentMethodProps {
  paymentMethod: string;
  editingCreditCard: CreditCardI | null;
  createCreditCard: () => void;
}
function PaymentMethod({
  paymentMethod,
  editingCreditCard,
  createCreditCard,
}: PaymentMethodProps) {
  switch (paymentMethod) {
    case "pix":
      return <Pix />;
    case "credit-card":
      return (
        <CreditCardComponent
          createCreditCard={createCreditCard}
          editingCreditCard={editingCreditCard}
        />
      );
    default:
      return <></>;
  }
}
function Pix() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <PixLogo size={64} className="text-teal-500" />
      <span className="text-lg">
        O QR code será gerado ao finalizar a compra.
      </span>
      <span className="text-sm text-custom-gray">
        Também será gerada uma chave Pix que poderá ser utilizada para o
        pagamento.
      </span>
    </div>
  );
}

const _creditCard: CreditCardI = {
  id: undefined,
  name: "",
  number: "",
  expirationDate: "",
  cvv: "",
  isFavorite: false,
};

interface CreditCardComponentProps {
  createCreditCard: (_object: object) => void;
  editingCreditCard: CreditCardI | null;
}
function CreditCardComponent({
  createCreditCard,
  editingCreditCard,
}: CreditCardComponentProps) {
  if (editingCreditCard)
    return <CreditCardForm editingCreditCard={editingCreditCard} />;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="text-lg">
        Você não tem nenhum cartão de crédito cadastrado
      </span>
      <span className="text-sm text-custom-gray">
        Clique no botão abaixo para cadastrar seu cartão.
      </span>
      <Button
        onClick={createCreditCard}
        className="border border-custom-tannat text-custom-tannat max-w-64"
      >
        Cadastrar cartão
      </Button>
    </div>
  );
}
interface CreditCardFormProps {
  editingCreditCard: CreditCardI;
}
function CreditCardForm({ editingCreditCard }: CreditCardFormProps) {
  const [creditCard, setCreditCard] = useState(editingCreditCard);
  const [errors, setErrors] = useState<Record<string, string>>({});
  function handleChange(_object: object) {
    setCreditCard((p) => ({ ...p, ..._object }));
  }
  async function handleAddCreditCard() {
    try {
      // const _address = {
      //   ...address,
      //   city: address.city?.key,
      //   state: address.state?.key,
      // };
      await creditCardSchema.validate(creditCard, { abortEarly: false });
      // await addAddress(address);
    } catch (e) {
      const { inner } = e as Yup.ValidationError;
      const errors: Record<string, string> = {};
      for (const { path, message } of inner) {
        if (path) errors[path] = message;
      }
      setErrors(errors);
    }
  }
  return (
    <div className="w-full flex flex-col gap-8">
      <main className="w-full flex flex-col gap-5">
        <Input
          error={errors["name"]}
          value={creditCard.name}
          onChangeText={(name) => handleChange({ name })}
          label="Nome"
        />
        <Input
          error={errors["number"]}
          value={creditCard.number}
          onChangeText={(number) => handleChange({ number })}
          label="Número do cartão"
          mask="9999 9999 9999 9999"
        />
        <Input
          error={errors["expirationDate"]}
          value={creditCard.expirationDate}
          onChangeText={(expirationDate) => handleChange({ expirationDate })}
          label="Validade (MM/AA)"
          mask="99/99"
        />
        <Input
          error={errors["cvv"]}
          value={creditCard.cvv}
          onChangeText={(cvv) => handleChange({ cvv })}
          label="CVV"
          mask="999"
        />
      </main>
      <header className="flex py-4 gap-8 justify-end ">
        <Button
          icon={<Check />}
          onClick={handleAddCreditCard}
          className="max-w-52 bg-custom-violet text-white"
        >
          Salvar endereço
        </Button>
      </header>
    </div>
  );
}

// const validationSchema = Yup.object().shape({
//   addressIdentify: Yup.string().required(
//     "O campo Identificação do endereço é obrigatório"
//   ),
//   recipientName: Yup.string().required(
//     "O campo Nome do destinatário é obrigatório"
//   ),
//   phone: Yup.string().required("O campo telefone é obrigatório"),
//   cep: Yup.string().required("O campo CEP é obrigatório"),
//   state: Yup.string().required("O campo estado é obrigatório"),
//   city: Yup.string().required("O campo cidade é obrigatório"),
//   neighborhood: Yup.string().required("O campo bairro é obrigatório"),
//   number: Yup.string().required("O campo número é obrigatório"),
//   complement: Yup.string().required("O campo complemento é obrigatório"),
//   address: Yup.string().required("O campo endereço é obrigatório"),
// });
const creditCardSchema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),

  number: Yup.string()
    .matches(
      /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
      "O número do cartão deve estar no formato 1111 1111 1111 1111"
    )
    .required("O número do cartão é obrigatório"),

  expirationDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "A validade deve estar no formato MM/AA"
    )
    .required("A data de validade é obrigatória"),

  cvv: Yup.string()
    .matches(/^[0-9]{3}$/, "O CVV deve ter 3 dígitos")
    .required("O CVV é obrigatório"),
});
interface CreditCardI {
  id?: string;
  name: string;
  number: string;
  expirationDate: string;
  cvv: string;
  isFavorite: boolean;
}
