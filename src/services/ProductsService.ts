import { GetProductsFilter } from "@/api/product/ProductRepository";
import { GetProductsResponse } from "@/api/product/ProductService";

interface ProductServiceI {
  getProducts({}: GetProductsFilter): Promise<GetProductsResponse>;
}

export class MochProductService implements ProductServiceI {
  public async getProducts({}: GetProductsFilter): Promise<GetProductsResponse> {
    return {
      pageIndex: 0,
      pageSize: 0,
      betweenPrices: "",
      total: 0,
      products: [],
    };
  }
}
