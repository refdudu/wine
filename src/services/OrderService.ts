import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firebaseFirestore } from "@/utils/firebaseClient"; // Seu arquivo de configuração do Firebase Client
import type { OrderDTO, OrderI, OrderItemDTO } from "@/interfaces/OrderI";
import type { AddressI } from "@/interfaces/AddressI";
import { api } from "@/utils/api";

// Interface para os dados necessários para criar um pedido

export class ApiOrderService {
  async createOrder(orderData: OrderDTO) {
    const { data } = await api.post("orders", orderData);
    return data.order;
  }

  // Futuramente, você pode adicionar métodos como:
  // async getOrdersByUserId(userId: string): Promise<OrderI[]> { ... }
  // async getOrderById(orderId: string): Promise<OrderI | null> { ... }
  // async updateOrderStatus(orderId: string, status: OrderI['status']): Promise<boolean> { ... }
}

// Para uso simplificado, você pode exportar uma instância:
// export const orderService = new ApiOrderService();
