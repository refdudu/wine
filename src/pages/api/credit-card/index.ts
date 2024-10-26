import { CreditCardRepositoryFirebase } from "@/api/credit-card/CreditCardRepository";
import {
  ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { creditCardSchema } from "@/validation/credit-card";
export default async function index(req: NextApiRequest, res: NextApiResponse) {
  return AuthMiddleware(main, req, res);
}

async function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;

  const creditCardRepository = new CreditCardRepositoryFirebase(userUid);
  if (req.method === "POST") {
    const creditCard = req.body;
    await creditCardSchema.validate(creditCard, { abortEarly: false });
    await creditCardRepository.add(creditCard);
    const creditCards = await creditCardRepository.get();

    return res.status(200).json({ creditCards });
  }

  if (req.method === "GET") {
    const creditCards = await creditCardRepository.get();
    return res.status(200).json({ creditCards });
  }
  return res.status(405);
}
