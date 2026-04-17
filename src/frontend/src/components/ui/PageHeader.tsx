import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  showBack = false,
  onBack,
  rightAction,
  className,
}: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.history.back();
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-card border-b border-border",
        className,
      )}
    >
      <div className="flex items-center h-14 px-4 gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-8 w-8 -ml-1 text-foreground"
            aria-label="Go back"
            data-ocid="page.back_button"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        )}
        <h1 className="font-display font-bold text-lg text-foreground flex-1 truncate">
          {title}
        </h1>
        {rightAction && <div className="flex-shrink-0">{rightAction}</div>}
      </div>
    </header>
  );
}
