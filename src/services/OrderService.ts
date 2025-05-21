import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/utils/firebaseClient'; // Seu arquivo de configuração do Firebase Client
import { OrderI, OrderItemI } from '@/interfaces/OrderI';
import { AddressI } from '@/interfaces/AddressI';

// Interface para os dados necessários para criar um pedido
export interface CreateOrderData {
  userId: string;
  items: OrderItemI[];
  totalAmount: number;
  shippingAddress: AddressI;
  // Adicione aqui informações de pagamento se necessário, ex: paymentMethodId, transactionId
  status?: OrderI['status']; // Opcional, padrão 'pending'
}

export class ApiOrderService {
  private ordersCollection = collection(db, 'orders');

  async createOrder(orderData: CreateOrderData): Promise<string | null> {
    try {
      const docRef = await addDoc(this.ordersCollection, {
        ...orderData,
        createdAt: serverTimestamp(), // Usa o timestamp do servidor do Firebase
        status: orderData.status || 'pending', // Define 'pending' como status padrão
      });
      console.log('Order created with ID: ', docRef.id);
      return docRef.id; // Retorna o ID do pedido criado
    } catch (error) {
      console.error('Error creating order: ', error);
      // Em um app real, você pode querer lançar um erro mais específico
      // ou retornar um objeto de erro para tratamento na UI.
      return null;
    }
  }

  // Futuramente, você pode adicionar métodos como:
  // async getOrdersByUserId(userId: string): Promise<OrderI[]> { ... }
  // async getOrderById(orderId: string): Promise<OrderI | null> { ... }
  // async updateOrderStatus(orderId: string, status: OrderI['status']): Promise<boolean> { ... }
}

// Para uso simplificado, você pode exportar uma instância:
// export const orderService = new ApiOrderService();
