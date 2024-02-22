import {
  GetProductsFilter,
  ProductRepositoryJson,
} from "@/api/product/ProductRepository";
import { ProductI } from "@/interfaces/ProductI";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetProductsResponse {
  products: ProductI[];
  //   message: string;
}
interface Query {
  filter: GetProductsFilter;
}

export default function index(
  req: NextApiRequest,
  res: NextApiResponse<GetProductsResponse>
) {
  if (req.method !== "GET") return res.status(401);
  const filter = req.query as unknown as GetProductsFilter;
  console.log("🚀 ~ filter:", filter)

  const productRepository = new ProductRepositoryJson();
  const products = productRepository.get(filter);

  res.status(200).json({ products });
}
