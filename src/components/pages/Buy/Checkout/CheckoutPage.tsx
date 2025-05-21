import { MapPin, PixLogo } from "@phosphor-icons/react";
import { BuyPageProvider, useBuyPage } from "../BuyContext";
import type { NextPageWithLayout } from "@/pages/_app";
import { BuyDefaultHeader } from "../BuyDefaultHeader";
import { AddressText } from "../Address/NewAddress";
import { Button } from "@/components/Button";
import { PaymentMethodE } from "../Payment/useBuyPaymentPage";
import MasterCardLogo from "../MastercardLogo.png";
import Image from "next/image";
import { useShoppingCart, useTotalShoppingCartProducts } from "@/contexts/ShoppingCartContext";
import { useSession } from "@/contexts/SessionContext"; // Para obter o userId
import { ApiOrderService, type CreateOrderData } from "@/services/OrderService"; // Serviço de Pedido
import { useRouter } from "next/router";
import { useState } from "react";
import type { OrderItemI } from "@/interfaces/OrderI";

export const CheckoutPage: NextPageWithLayout = () => {
  return (
    <>
      <BuyDefaultHeader
        {...{
          title: "Revise e confirme sua compra",
        }}
      />
      <Main />
      {/* Footer é movido para dentro de Main ou tem props para lidar com a lógica de finalização */}
    </>
  );
};
function Main() {
  const totalFormatted = useTotalShoppingCartProducts(); // Este é o total formatado como string R$
  const { products: cartProducts, totalProductsValue, clearCart } = useShoppingCart(); // Para itens e total numérico
  const { user } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    selectedAddressId,
    addresses,
    selectedPaymentMethod,
    creditCards,
    selectedCreditCardId,
  } = useBuyPage();

  const deliveryAddress = addresses.find((x) => x.id === selectedAddressId);

  let paymentMethodInfo = {
    icon: <></>,
    title: "",
  };
  switch (selectedPaymentMethod) {
    case PaymentMethodE.CreditCard:
      {
        const creditCard = creditCards.find(
          (x) => x.id === selectedCreditCardId
        );
        paymentMethodInfo = {
          icon: (
            <Image width={24} src={MasterCardLogo} alt="Bandeira do cartão" />
          ),
          title: `Mastercard ${creditCard?.number}`,
        };
      }
      break;
    case PaymentMethodE.Pix:
      {
        paymentMethodInfo = {
          icon: <PixLogo size={24} className="text-teal-500" />,
          title: "Pix",
        };
      }
      break;
  }

  const handleFinalizePurchase = async () => {
    if (!user || !deliveryAddress || cartProducts.length === 0) {
      // Idealmente, mostrar um erro para o usuário
      console.error("Usuário não logado, endereço não selecionado ou carrinho vazio.");
      return;
    }
    setIsLoading(true);
    const orderService = new ApiOrderService();

    const orderItems: OrderItemI[] = cartProducts.map(product => ({
      productId: product.id,
      productName: product.name,
      quantity: product.quantity,
      pricePerItem: product.price, // Assumindo que product.price é o preço unitário
      productImage: product.image,
    }));

    const orderData: CreateOrderData = {
      userId: user.uid, // Assumindo que user.uid é o ID do usuário
      items: orderItems,
      totalAmount: totalProductsValue, // Usar o valor numérico total
      shippingAddress: deliveryAddress,
      // status será 'pending' por padrão no serviço
    };

    try {
      const orderId = await orderService.createOrder(orderData);
      if (orderId) {
        console.log("Pedido criado com ID:", orderId);
        clearCart(); // Limpar carrinho após sucesso
        // Redirecionar para a página de perfil ou uma página de sucesso do pedido
        router.push('/profile/settings'); 
      } else {
        // Tratar erro na criação do pedido (ex: mostrar notificação)
        console.error("Falha ao criar o pedido.");
        alert("Houve um problema ao finalizar seu pedido. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      alert("Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!deliveryAddress) return <p>Carregando informações ou endereço não selecionado...</p>; // Melhorar UI de carregamento/erro

  return (
    <div className="flex flex-col flex-grow">
      <main className="mt-4 lg:h-auto flex-grow gap-8 flex flex-col">
        <InformationItem
          action={{ href: "/buy/address", label: "Editar ou escolher outro" }}
          icon={<MapPin className="text-custom-violet" size={24} />}
          info={{
            title: deliveryAddress.addressIdentify || `${deliveryAddress.street}, ${deliveryAddress.number}`,
            subTitle: <AddressText address={deliveryAddress} />,
          }}
          title="Detalhes do envio"
        />
        <InformationItem
          action={{ href: "/buy/payment", label: "Alterar" }}
          icon={paymentMethodInfo.icon}
          info={{
            title: paymentMethodInfo.title,
            subTitle: `Você pagará ${totalFormatted}`,
          }}
          title="Detalhes do pagamento"
        />
      </main>
      <footer className="flex lg:justify-between flex-col lg:flex-row gap-4 w-full mt-auto pt-4 border-t border-t-custom-line ">
        <Button onClick={() => router.back()} className="lg:max-w-48 h-10" styleType="default" disabled={isLoading}>
          Voltar
        </Button>
        <Button onClick={handleFinalizePurchase} className="lg:max-w-64 h-10" styleType="success" disabled={isLoading || !user || cartProducts.length === 0}>
          {isLoading ? 'Processando...' : 'Finalizar compra'}
        </Button>
      </footer>
    </div>
  );
}

CheckoutPage.getLayout = (page) => <BuyPageProvider>{page}</BuyPageProvider>;

interface InformationItemProps {
  info: {
    title: string;
    subTitle?: React.ReactNode;
  };
  title: string;
  icon: React.ReactNode;
  action: {
    href: string;
    label: string;
  };
}
function InformationItem({ icon, title, action, info }: InformationItemProps) {
  return (
    <div className="w-full flex-col flex gap-2">
      <span className="font-semibold">{title}</span>
      <div className="flex justify-between gap-8 items-center w-full  bg-custom-background-light rounded p-4">
        <div className="flex flex-1 gap-4">
          <div className="h-12 w-12 rounded-full items-center bg-white flex justify-center ">
            {icon}
          </div>
          <div className="flex flex-col flex-1 max-w-80">
            {<span className="text-lg">{info.title}</span>}
            <div className="text-custom-gray-light text-sm">
              {info.subTitle}
            </div>
          </div>
        </div>
        <div>
          {/* Não desabilitar botões de navegação/edição */}
          <Button href={action.href} className="text-custom-violet">
            {action.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
