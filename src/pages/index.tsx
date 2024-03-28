import { GetProductsResponse } from "@/api/product/ProductService";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import { ApiProductService } from "@/services/ProductsService";
import { LargeLayout } from "@/components/pages/Home/LargeLayout";

interface StaticProps {
  initialData: GetProductsResponse;
}

1;
export default function Home({ initialData }: StaticProps) {
  return (
    <Layout>
      <div className="max-w-[1120px] w-full my-10 flex justify-between mx-auto px-3">
        <LargeLayout initialData={initialData} />
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
