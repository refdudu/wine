import { GetProductsResponse } from "@/api/product/ProductService";
import { GetStaticProps } from "next";
import { SideBar } from "@/components/Sidebar";
import { Layout } from "@/components/Layout";
import { ProductsGrid } from "@/components/ProductsGrid";
import { useHome } from "@/components/pages/Home/useHome";
import { ApiProductService } from "@/services/ProductsService";

interface StaticProps {
  initialData: GetProductsResponse;
}

1;
export default function Home({ initialData }: StaticProps) {
  const {
    handleFilterBetweenPrices,
    handleFilterSearch,
    productsResponse,
    setPageIndex,
    betweenPrices,
    pageIndex,
    searchText,
  } = useHome(initialData);

  return (
    <Layout>
      <div className="max-w-[1120px] w-full my-10 flex justify-between mx-auto px-3">
        <SideBar
          betweenPrices={betweenPrices}
          changeBetweenPrice={handleFilterBetweenPrices}
        />
        {productsResponse && (
          <ProductsGrid
            {...{
              pageIndex,
              productsResponse,
              setPageIndex,
              handleFilterSearch,
              searchText,
            }}
          />
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const apiProductsService = new ApiProductService();
  const initialData = await apiProductsService.getProducts({
    betweenPrices: "",
    pageIndex: 0,
    pageSize: 9,
    searchText: "",
  });
  return {
    props: {
      initialData,
    },
    revalidate: false,
  };
};
