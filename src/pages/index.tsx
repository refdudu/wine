import { GetProductsResponse } from "@/api/product/ProductService";
import { GetStaticProps } from "next";
import { Layout } from "@/components/Layout";
import { ApiProductService } from "@/services/ProductsService";
import { LargeLayout } from "@/components/pages/Home/LargeLayout";
import { MobileLayout } from "@/components/pages/Home/MobileLayout";

interface StaticProps {
  initialData: GetProductsResponse;
}

export default function Home({ initialData }: StaticProps) {
  if (typeof window === "undefined") return <div />;
  const isMobile = window.innerWidth < 1120;

  return (
    <Layout>
      <div className="max-w-[1120px] w-full my-10 flex justify-between mx-auto px-3">
        <MobileLayout initialData={initialData} />
        {/* {!isMobile && } */}
      </div>
    </Layout>
  );
}

// export const getStaticProps: GetStaticProps<StaticProps> = async () => {
//   const apiProductsService = new ApiProductService();
//   const initialData = await apiProductsService.getProducts({
//     betweenPrices: "",
//     pageIndex: 0,
//     pageSize: 9,
//     searchText: "",
//   });
//   return {
//     props: {
//       initialData,
//     },
//     revalidate: false,
//   };
// };
