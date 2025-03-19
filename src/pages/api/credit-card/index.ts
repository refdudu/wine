import { CreditCardRepositoryFirebase } from "@/api/credit-card/CreditCardRepository";
import {
  type ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { creditCardSchema } from "@/validation/credit-card";
import * as Yup from "yup";
import { GetFieldsErrors } from "@/utils/errors/GetFieldsErrors";

export default async function index(req: NextApiRequest, res: NextApiResponse) {
  return AuthMiddleware(main, req, res);
}

async function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;
  const creditCardRepository = new CreditCardRepositoryFirebase(userUid);

  if (req.method === "POST") {
    const creditCard = req.body;
    try {
      await creditCardSchema.validate(creditCard, { abortEarly: false });
      await creditCardRepository.add(creditCard);
      const creditCards = await creditCardRepository.get();
      return res.status(200).json({ creditCards });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(404).json({ errors: GetFieldsErrors(err) });
      }
    }
  }

  if (req.method === "GET") {
    const creditCards = await creditCardRepository.get();
    return res.status(200).json({ creditCards });
  }
  return res.status(405);
}
