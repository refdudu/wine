import { CreditCardRepositoryFirebase } from "@/api/credit-card/CreditCardRepository";
import {
  ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import { GetProductsResponse } from "@/api/product/ProductService";
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

  if (req.method === "DELETE") {
    await creditCardRepository.delete(creditCardId);
    const creditCards = await creditCardRepository.get();
    return res.status(200).json({ creditCards });
  }

  return res.status(200);
}
