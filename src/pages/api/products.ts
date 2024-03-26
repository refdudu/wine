import {
  GetProductsFilter,
  ProductRepositoryJson,
} from "@/api/product/ProductRepository";
import { GetProductsResponse, ProductService } from "@/api/product/ProductService";
import { ProductI } from "@/interfaces/ProductI";
import { NextApiRequest, NextApiResponse } from "next";
export default function index(
  req: NextApiRequest,
  res: NextApiResponse<GetProductsResponse>
) {
  if (req.method !== "GET") return res.status(401);
  const filter = req.query as unknown as GetProductsFilter;
  const productRepository = new ProductRepositoryJson();
  var productService = new ProductService(productRepository);
  var response = productService.get(filter);
  return res.status(200).json(response);
}
