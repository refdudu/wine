import { Layout } from "@/components/Layout";
import { OnlyAuthContent } from "@/components/OnlyAuthContainer";
import { ApiOrderService } from "@/services/OrderService";
import type { OrderI } from "@/interfaces/OrderI";
import { useEffect, useState } from "react";
import { Spin } from "@/components/Spin";
import { useSession } from "@/contexts/SessionContext";
import {
  EmptyOrdersState,
  ErrorState,
  OrdersList,
} from "@/components/pages/Orders";

const orderService = new ApiOrderService();

PedidosPage.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;

export default function PedidosPage() {
  return (
    <OnlyAuthContent>
      <PedidosPageContent />
    </OnlyAuthContent>
  );
}

const PedidosPageContent = () => {
  const session = useSession();
  const { isAuthorized } = session;

  const [orders, setOrders] = useState<OrderI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthorized) loadOrders();
  }, [isAuthorized]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const ordersData = await orderService.getOrders();
      console.log("🚀 ~ loadOrders ~ ordersData:", ordersData);
      setOrders(ordersData);
    } catch (err) {
      console.error("Erro ao carregar pedidos:", err);
      setError("Erro ao carregar pedidos. Tente novamente.");
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

  return (
    <div className="w-full px-4 py-8 overflow-auto h-full">
      <div className="container mx-auto">
        <header className="w-full mb-5">
          <h1 className="text-3xl font-bold">Meus Pedidos</h1>
          <p className="text-gray-600 mt-2">
            Acompanhe o status dos seus pedidos
          </p>
        </header>

        {error && <ErrorState error={error} onRetry={loadOrders} />}

        {orders.length === 0 ? (
          <EmptyOrdersState />
        ) : (
          <OrdersList orders={orders} />
        )}
      </div>
    </div>
  );
};
