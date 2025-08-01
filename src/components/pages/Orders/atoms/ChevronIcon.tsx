interface ChevronIconProps {
  isOpen: boolean;
  className?: string;
}

export const ChevronIcon = ({ isOpen, className = "w-4 h-4 transition-transform" }: ChevronIconProps) => {
  return (
    <svg
      className={`${className} ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <title>Toggle dropdown</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};
