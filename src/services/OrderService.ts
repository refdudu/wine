import type { OrderDTO, OrderI } from "@/interfaces/OrderI";
import { api } from "@/utils/api";

// Interface para os dados necessários para criar um pedido

export class ApiOrderService {
  async createOrder(orderData: OrderDTO): Promise<string> {
    const { data } = await api.post("orders", orderData);
    return data.orderId;
  }

  async getOrders(): Promise<OrderI[]> {
    const { data } = await api.get("orders");
    return data.orders;
  }

  // Futuramente, você pode adicionar métodos como:
  // async getOrderById(orderId: string): Promise<OrderI | null> { ... }
  // async updateOrderStatus(orderId: string, status: OrderI['status']): Promise<boolean> { ... }
}

// Para uso simplificado, você pode exportar uma instância:
export const orderService = new ApiOrderService();
