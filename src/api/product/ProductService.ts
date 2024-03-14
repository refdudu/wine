import { ProductI } from "@/interfaces/ProductI";
import {
  GetProductsFilter,
  ProductRepositoryI,
  ProductRepositoryJson,
} from "./ProductRepository";

export interface ListResponse extends GetProductsFilter {
  total: number;
  products: ProductI[];
}
export class ProductService {
  constructor(private productRepository: ProductRepositoryI) {}
  public get(filter: GetProductsFilter): ListResponse {
    const products = this.productRepository.get(filter);
    const total = this.productRepository.getTotal(filter);
    return {
      ...filter,
      pageIndex: filter.pageIndex ? Number(filter.pageIndex) : 0,
      pageSize: filter.pageSize ? Number(filter.pageSize) : 0,
      total,
      products,
    };
  }
}
