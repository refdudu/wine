import { CreditCardRepositoryFirebase } from "@/api/credit-card/CreditCardRepository";
import {
  ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import { GetProductsResponse } from "@/api/product/ProductService";
import { creditCardSchema } from "@/validation/credit-card";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<GetProductsResponse>
) {
  return AuthMiddleware(main, req, res);
}
async function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;
  const { creditCardId } = req.query as { creditCardId: string };
  const creditCardRepository = new CreditCardRepositoryFirebase(userUid);

  if (req.method === "PUT") {
    const creditCard = req.body;
    await creditCardSchema.validate(creditCard, { abortEarly: false });
    await creditCardRepository.update(creditCardId, creditCard);
    return res.status(200).json({});
  }
  if (req.method === "DELETE") {
    await creditCardRepository.delete(creditCardId);
    return res.status(200).json({});
  }
  return res.status(200);
}
