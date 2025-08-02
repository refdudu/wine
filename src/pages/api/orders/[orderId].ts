import {
  type ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import { OrderRepositoryFirebase } from "@/api/order/OrderRepository";
import type { GetProductsResponse } from "@/api/product/ProductService";
import type { OrderItem } from "@/interfaces/OrderI";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<GetProductsResponse>
) {
  return AuthMiddleware(main, req, res);
}
async function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;
  const { orderId } = req.query as { orderId: string };
  const orderRepository = new OrderRepositoryFirebase(userUid);

  if (req.method === "DELETE") {
    // await creditCardRepository.delete(creditCardId);
    // const creditCards = await creditCardRepository.get();
    // return res.status(200).json({ creditCards });
  }

  if (!orderId || typeof orderId !== "string") {
    return res.status(400).json({ error: "ID do pedido é obrigatório" });
  }

  if (req.method === "GET") {
    try {
      const order = await orderRepository.getById(orderId);

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      // Calcular totalAmount para o pedido
      const orderWithTotal = {
        ...order,
        totalAmount: order.items.reduce((total: number, item: OrderItem) => {
          return total + item.product.price * item.amount;
        }, 0),
      };

      return res.status(200).json({ order: orderWithTotal });
    } catch (error) {
      console.error("Erro ao buscar pedido:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  return res.status(200);
}
