interface OrderInfoFieldProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

export const OrderInfoField = ({ label, value, className = "" }: OrderInfoFieldProps) => {
  return (
    <div className={`flex flex-col gap-2 text-sm text-gray-500 ${className}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};
