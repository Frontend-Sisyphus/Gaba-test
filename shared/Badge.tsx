import "@/styles/shared/badge.css";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const variants = {
  default: "badge--default",
  success: "badge--success",
  warning: "badge--warning",
  danger: "badge--danger",
  info: "badge--info",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={`badge ${variants[variant]}`}>
      {children}
    </span>
  );
}