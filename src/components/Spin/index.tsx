import styles from "./styles.module.css";
interface SpinProps {
  size?: number;
  color?: string;
  borderWidth?: number;
}

export function Spin({
  size = 50,
  color = "#D14B8F",
  borderWidth = 10,
}: SpinProps) {
  return (
    <div
      style={{
        width: size,
        WebkitMask: `radial-gradient(farthest-side, #0000 calc(100% - ${borderWidth}px), #000 0)`,
        background: `radial-gradient(farthest-side, ${color} 94%, #0000)
                     top/8px 8px no-repeat, conic-gradient(#0000 30%, ${color})`,
      }}
      className={styles.loader}
    />
  );
}
