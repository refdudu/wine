import type { GetProductsFilter } from "@/api/product/ProductRepository";
import type {
  GetProductResponse,
  GetProductsResponse,
} from "@/api/product/ProductService";
import type { ProductI } from "@/interfaces/ProductI";
import { api } from "@/utils/api";

export interface ProductServiceI {
  getProducts(props: GetProductsFilter): Promise<GetProductsResponse>;
  getProduct(id: string): Promise<ProductI>;
  searchProducts(ids: string[]): Promise<ProductI[]>;
}
export class ApiProductService implements ProductServiceI {
  async getProduct(id: string): Promise<ProductI> {
    const { data } = await api.get<GetProductResponse>(`products/${id}`, {});
    return data.product;
  }
  public async searchProducts(ids: string[]): Promise<ProductI[]> {
    const { data } = await api.get<ProductI[]>("products/search", {
      params: {
        ids: ids.join(","),
      },
    });
    return data;
  }
  public async getProducts(
    params: GetProductsFilter
  ): Promise<GetProductsResponse> {
    const { data } = await api.get<GetProductsResponse>("products", {
      params,
    });
    return data;
  }
}
// export class MockProductService implements ProductServiceI {
//   async getProduct(id: string): Promise<GetProductResponse> {
//     throw new Error("Method not implemented.");
//   }
//   searchProducts(ids: string[]): Promise<ProductI[]> {
//     throw new Error("Method not implemented.");
//   }
//   public async getProducts(
//     props: GetProductsFilter
//   ): Promise<GetProductsResponse> {
//     return {
//       ...props,
//       pageIndex: 0,
//       pageSize: 0,
//       total: 0,
//       products: [],
//     };
//   }
// }
