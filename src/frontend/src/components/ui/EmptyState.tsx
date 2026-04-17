import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon = "🔍",
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-ocid="empty_state"
      className={cn(
        "flex flex-col items-center justify-center text-center px-6 py-12 gap-4",
        className,
      )}
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
        <span className="text-4xl" role="img" aria-hidden>
          {icon}
        </span>
      </div>
      <div className="space-y-1.5">
        <h3 className="font-display font-semibold text-base text-foreground">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            {description}
          </p>
        )}
      </div>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          data-ocid="empty_state.primary_button"
          className="mt-2"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
