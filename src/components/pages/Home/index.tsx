import { Layout, useLayout } from "@/components";
import { MobileLayout } from "./MobileLayout";
import { LargeLayout } from "./LargeLayout";

export function Home() {
	return (
		<Layout>
			<div className="max-w-[1120px] w-full my-10 flex justify-between mx-auto px-3">
				<Content />
			</div>
		</Layout>
	);
}
function Content() {
	const { isMobile } = useLayout();
	if (isMobile === undefined) return <></>;
	if (isMobile) {
		return <MobileLayout />;
	} else {
		return <LargeLayout />;
	}
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
