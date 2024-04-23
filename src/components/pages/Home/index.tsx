import { Layout, useLayout } from "@/components";
import { MobileLayout } from "./MobileLayout";
import { LargeLayout } from "./LargeLayout";

const a = "";
export function Home() {
	return (
		<Layout>
			<Content />
		</Layout>
	);
}
function Content() {
	const { isMobile } = useLayout();
	return <div className="max-w-[1120px] w-full my-10 flex justify-between mx-auto px-3">{isMobile ? <MobileLayout /> : <LargeLayout />}</div>;
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
