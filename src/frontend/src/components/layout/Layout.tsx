import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { useQuery } from "@tanstack/react-query";
import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { actor, isFetching } = useBackend();
  const { isAuthenticated } = useAuth();

  const { data: notifications } = useQuery({
    queryKey: ["myNotifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyNotifications();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    refetchInterval: 30000,
    staleTime: 15000,
  });

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 max-w-md mx-auto w-full pb-16">{children}</div>
      <BottomNav unreadCount={unreadCount} />
      <Toaster position="top-center" richColors />
    </div>
  );
}
