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

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  return AuthMiddleware(main, req, res);
}

async function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;
  const orderRepository = new OrderRepositoryFirebase(userUid);

  if (req.method === "POST") {
    const order = req.body;
    try {
      await orderSchema.validate(order, { abortEarly: false });
      await orderRepository.add(order);
      const orders = await orderRepository.get();
      return res.status(200).json({ orders });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(404).json({ errors: GetFieldsErrors(err) });
      }
    }
  }

//   if (req.method === "GET") {
//     const orders = await orderRepository.get();
//     return res.status(200).json({ orders });
//   }
  return res.status(405);
}
