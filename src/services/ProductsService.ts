import { GetProductsFilter } from "@/api/product/ProductRepository";
import { GetProductsResponse } from "@/api/product/ProductService";
import { api } from "@/utils/api";

export interface ProductServiceI {
  getProducts({}: GetProductsFilter): Promise<GetProductsResponse>;
}

export class ApiProductService implements ProductServiceI {
  public async getProducts(
    params: GetProductsFilter
  ): Promise<GetProductsResponse> {
    // const params = {
    //   pageIndex,
    //   pageSize,
    //   betweenPrices,
    //   searchText,
    // };
    // const wait = () =>
    //   new Promise((resolve, reject) => {
    //     setTimeout(resolve, 2000);
    //   });
    // await wait();
    const { data } = await api.get<GetProductsResponse>("products", {
      params,
    });
    console.log(data)
    return data;
    // return {
    //   pageIndex: 0,
    //   pageSize: 0,
    //   total: 0,
    //   products: [],
    // };
  }
}
export class MockProductService implements ProductServiceI {
  public async getProducts({}: GetProductsFilter): Promise<GetProductsResponse> {
    return {
      pageIndex: 0,
      pageSize: 0,
      total: 0,
      products: [],
    };
  }
}
