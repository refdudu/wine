import { MasterContext } from "@/contexts/MasterContext";
import { useSession } from "@/contexts/SessionContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout } from "./Layout";

interface OnlyAuthContainerProps {
  children: React.ReactNode;
}
export function OnlyAuthContainer({ children }: OnlyAuthContainerProps) {
  return (
    <MasterContext>
      <OnlyAuthContent>{children}</OnlyAuthContent>
    </MasterContext>
  );
}
export function OnlyAuthLayout({ children }: OnlyAuthContainerProps) {
  return (
    <Layout>
      <OnlyAuthContent>{children}</OnlyAuthContent>
    </Layout>
  );
}
export function OnlyAuthContent({ children }: OnlyAuthContainerProps) {
  const { isAuthorized, isLoadingAuthorization } = useSession();
  const { push } = useRouter();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isLoadingAuthorization && !isAuthorized) {
      push("/");
    }
  }, [isAuthorized, isLoadingAuthorization]);

  //   if (isLoadingAuthorization) {
  //     return (
  //       <div className="w-full h-64 flex justify-center items-end">
  //         <Spin />
  //       </div>
  //     );
  //   }
  if (isAuthorized) {
    return children;
  }
  return <></>;
}
