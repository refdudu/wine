import { AddressRepositoryFirebase } from "@/api/address/AddressRepository";
import { GetFieldsErrors } from "@/utils/errors/GetFieldsErrors";
import {
  type ApiRequestAuth,
  AuthMiddleware,
} from "@/api/middlewares/AuthMiddleware";
import type { GetProductsResponse } from "@/api/product/ProductService";
import { addressValidationSchema } from "@/validation/address";
import type { NextApiRequest, NextApiResponse } from "next";
import * as Yup from "yup";

export default async function index(
  req: NextApiRequest,
  res: NextApiResponse<GetProductsResponse>
) {
  return AuthMiddleware(main, req, res);
}
async function main(req: ApiRequestAuth, res: NextApiResponse) {
  const { userUid } = req;
  const { addressId } = req.query as { addressId: string };
  const addressRepository = new AddressRepositoryFirebase(userUid);

  if (req.method === "PUT") {
    const address = req.body;
    try {
      await addressValidationSchema.validate(address, { abortEarly: false });
      await addressRepository.update(addressId, address);
      const addresses = await addressRepository.get();
      return res.status(200).json({ addresses });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(404).json({ errors: GetFieldsErrors(err) });
      }
    }
  }
  if (req.method === "DELETE") {
    await addressRepository.delete(addressId);
    const addresses = await addressRepository.get();
    return res.status(200).json({ addresses });
  }
  return res.status(200);
}
