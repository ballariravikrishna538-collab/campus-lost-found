import type { Category } from "@/types";
import { CATEGORY_COLORS, CATEGORY_ICONS, CATEGORY_LABELS } from "@/types";

interface CategoryBadgeProps {
  category: Category | string;
  showIcon?: boolean;
  className?: string;
}

export function CategoryBadge({
  category,
  showIcon = true,
  className = "",
}: CategoryBadgeProps) {
  const label = CATEGORY_LABELS[category] ?? String(category);
  const colorClass =
    CATEGORY_COLORS[category] ?? "bg-muted text-muted-foreground";
  const icon = CATEGORY_ICONS[category] ?? "📦";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${colorClass} ${className}`}
    >
      {showIcon && <span className="text-[10px]">{icon}</span>}
      {label}
    </span>
  );
}
