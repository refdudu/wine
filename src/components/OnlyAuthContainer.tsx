import { MasterContext } from "@/contexts/MasterContext";
import { useSession } from "@/contexts/SessionContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spin } from "./Spin";

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
function OnlyAuthContent({ children }: OnlyAuthContainerProps) {
  const { isAuthorized, isLoadingAuthorization } = useSession();
  const { push } = useRouter();
  useEffect(() => {
    console.log(isLoadingAuthorization, isAuthorized);
    if (!isLoadingAuthorization && !isAuthorized) {
      push("/");
    }
  }, [isAuthorized, isLoadingAuthorization]);
  if (isLoadingAuthorization) {
    return (
      <div className="w-full h-64 flex justify-center items-end">
        <Spin />
      </div>
    );
  }
  if (isAuthorized) {
    return children;
  }
  return <></>;
}
