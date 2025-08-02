import { CreditCardRepositoryFirebase } from "@/api/credit-card/CreditCardRepository";
import {
  type ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { creditCardSchema } from "@/validation/credit-card";
import * as Yup from "yup";
import { GetFieldsErrors } from "@/utils/errors/GetFieldsErrors";
import { OrderRepositoryFirebase } from "@/api/order/OrderRepository";
import { orderSchema } from "@/validation/order";
import type { OrderItem } from "@/interfaces/OrderI";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  return AuthMiddleware(main, req, res);
}

async function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;
  const orderRepository = new OrderRepositoryFirebase(userUid);
  //   return res.json({ message: "Order API is working" });

    if (req.method === "POST") {
      const order = req.body;
      try {
        await orderSchema.validate({ ...order, userUid }, { abortEarly: false });
        const orderId = await orderRepository.add({ ...order, userUid });
        // console.log("🚀 ~ main ~ orderId:", orderId);
        return res.status(200).json({ orderId });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          return res.status(404).json({ errors: GetFieldsErrors(err) });
        }
        throw err;
      }
    }

  if (req.method === "GET") {
    const orders = await orderRepository.get();
    // Calcular totalAmount para cada pedido
    const ordersWithTotal = orders.map(order => ({
      ...order,
      totalAmount: order.items.reduce((total: number, item: OrderItem) => {
        return total + (item.product.price * item.amount);
      }, 0)
    }));
    return res.status(200).json({ orders: ordersWithTotal });
  }
  return res.status(405).send('');
}
