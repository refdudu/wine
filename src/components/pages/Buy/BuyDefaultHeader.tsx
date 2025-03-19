import { CreditCard, type Icon } from "@phosphor-icons/react";

interface HeaderProps {
  icon?: Icon;
  title: string;
  action?: React.ReactNode;
}
export function BuyDefaultHeader({ icon: Icon, title, action }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b pb-4 border-b-custom-line text-custom-gray h-14">
      <div className="flex gap-2 items-center">
        {Icon && <Icon size={24} />}
        <span className="text-xl">{title}</span>
      </div>
      {action && action}
    </header>
  );
}
