import { Layout } from "@/components/Layout";
import { OnlyAuthContent } from "@/components/OnlyAuthContainer";
import { ApiOrderService } from "@/services/OrderService";
import type { OrderI } from "@/interfaces/OrderI";
import { useEffect, useState } from "react";
import { Spin } from "@/components/Spin";
import { useSession } from "@/contexts/SessionContext";
import { useRouter } from "next/router";
import {
  OrderDetailsHeader,
  OrderDetailsItems,
  OrderDetailsPayment,
  OrderDetailsShipping,
  OrderDetailsTimeline,
} from "@/components/pages/OrderDetails";

const orderService = new ApiOrderService();

OrderDetailsPage.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default function OrderDetailsPage() {
  return (
    <OnlyAuthContent>
      <OrderDetailsPageContent />
    </OnlyAuthContent>
  );
}

const OrderDetailsPageContent = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const session = useSession();
  const { isAuthorized } = session;

  const [order, setOrder] = useState<OrderI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthorized && orderId && typeof orderId === 'string') {
      loadOrder(orderId);
    }
  }, [isAuthorized, orderId]);

  const loadOrder = async (orderIdParam: string) => {
    try {
      setLoading(true);
      setError(null);
      const orderData = await orderService.getOrderById(orderIdParam);
      setOrder(orderData);
    } catch (err) {
      console.error("Erro ao carregar pedido:", err);
      setError("Erro ao carregar pedido. Tente novamente.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <Spin />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Pedido não encontrado"}
          </h1>
          <button
            type="button"
            onClick={() => router.push('/profile/orders')}
            className="text-blue-600 hover:underline"
          >
            Voltar para meus pedidos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 overflow-auto h-full bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <OrderDetailsHeader order={order} onBack={() => router.push('/profile/orders')} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <OrderDetailsItems order={order} />
            <OrderDetailsTimeline order={order} />
          </div>
          
          <div className="space-y-6">
            <OrderDetailsPayment order={order} />
            <OrderDetailsShipping order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};
