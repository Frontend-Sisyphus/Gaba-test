import "@/styles/shared/spinner.css";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "spinner__circle--sm",
  md: "spinner__circle--md",
  lg: "spinner__circle--lg",
};

export function Spinner({ size = 'md' }: SpinnerProps) {
  return (
    <div className="spinner">
      <div className={`spinner__circle ${sizes[size]}`} />
    </div>
  );
}