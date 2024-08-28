import { WithAuth } from "@/HOC/WithAuth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export { Home as default } from "@/components/pages/Home/index";
export const getServerSideProps: GetServerSideProps = WithAuth(
  () => ({}),
  false
);
