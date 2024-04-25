import RcDrawer, { type DrawerProps } from "rc-drawer";
import "rc-drawer/assets/index.css";
import motionProps from "./motion";

export function Drawer(props: DrawerProps) {
  return <RcDrawer {...props} {...motionProps} />;
}
