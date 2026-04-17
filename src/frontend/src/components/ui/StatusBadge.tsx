import type { ItemStatus } from "@/types";
import { ItemStatus as ItemStatusEnum } from "@/types";

interface StatusBadgeProps {
  status: ItemStatus | string;
  className?: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string; dot: string }
> = {
  [ItemStatusEnum.open]: {
    label: "Open",
    className: "bg-blue-50 text-blue-600 border border-blue-200",
    dot: "bg-blue-500",
  },
  [ItemStatusEnum.matched]: {
    label: "Matched",
    className: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    dot: "bg-yellow-500",
  },
  [ItemStatusEnum.resolved]: {
    label: "Resolved",
    className: "bg-green-50 text-green-700 border border-green-200",
    dot: "bg-green-500",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    label: String(status),
    className: "bg-muted text-muted-foreground border border-border",
    dot: "bg-muted-foreground",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${config.className} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
