import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingScreen } from "@/components/ui/LoadingSpinner";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { useBackend } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { NotificationType } from "@/types";
import type { Notification } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Bell, Check, CheckCheck, MessageCircle, X } from "lucide-react";
import { toast } from "sonner";

// ── helpers ────────────────────────────────────────────────────────────────

function timeAgo(ts: bigint): string {
  const ms = Number(ts);
  const date = ms > 1e12 ? new Date(ms / 1_000_000) : new Date(ms);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface NotifCfg {
  Icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  label: string;
}

const NOTIF_CFG: Record<string, NotifCfg> = {
  [NotificationType.match_found]: {
    Icon: Bell,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    label: "Match Found",
  },
  [NotificationType.claim_approved]: {
    Icon: Check,
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary-foreground",
    label: "Claim Approved",
  },
  [NotificationType.claim_rejected]: {
    Icon: X,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    label: "Claim Rejected",
  },
  [NotificationType.claim_received]: {
    Icon: MessageCircle,
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    label: "Claim Received",
  },
};

// ── row component ──────────────────────────────────────────────────────────

function NotifRow({
  n,
  index,
  onTap,
}: {
  n: Notification;
  index: number;
  onTap: (n: Notification) => void;
}) {
  const cfg =
    NOTIF_CFG[n.notificationType] ?? NOTIF_CFG[NotificationType.match_found];
  const { Icon } = cfg;

  return (
    <button
      type="button"
      data-ocid={`notifications.item.${index}`}
      onClick={() => onTap(n)}
      className={cn(
        "w-full text-left flex items-start gap-3 px-4 py-3.5 border-b border-border last:border-0",
        "transition-smooth hover:bg-muted/50 active:bg-muted",
        !n.read && "bg-primary/[0.03]",
      )}
    >
      {/* icon circle */}
      <div
        className={cn(
          "mt-0.5 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
          cfg.iconBg,
        )}
      >
        <Icon className={cn("w-4 h-4", cfg.iconColor)} />
      </div>

      {/* text */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-primary mb-0.5 uppercase tracking-wide">
          {cfg.label}
        </p>
        <p
          className={cn(
            "text-sm leading-snug",
            n.read ? "text-muted-foreground" : "text-foreground font-medium",
          )}
        >
          {n.message}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {timeAgo(n.createdAt)}
        </p>
      </div>

      {/* unread dot */}
      {!n.read && (
        <span
          className="mt-2 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-primary"
          aria-label="Unread"
        />
      )}
    </button>
  );
}

// ── page ───────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["myNotifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyNotifications();
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
  });

  const markRead = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not ready");
      return actor.markNotificationRead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNotifications"] });
    },
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      if (!actor || !notifications) return;
      const unread = notifications.filter((n: Notification) => !n.read);
      await Promise.all(unread.map((n) => actor.markNotificationRead(n.id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNotifications"] });
      toast.success("All notifications marked as read");
    },
  });

  function handleTap(n: Notification) {
    if (!n.read) markRead.mutate(n.id);
    if (n.itemId !== undefined && n.itemId !== null) {
      navigate({ to: "/item/$id", params: { id: String(n.itemId) } });
    }
  }

  const sorted = [...(notifications ?? [])].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  );
  const unreadCount = sorted.filter((n) => !n.read).length;

  if (isLoading) return <LoadingScreen label="Loading notifications…" />;

  return (
    <div className="flex flex-col" data-ocid="notifications.page">
      <PageHeader
        title={`Notifications${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
        rightAction={
          unreadCount > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-primary"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
              data-ocid="notifications.mark_all_read_button"
            >
              <CheckCheck className="w-3 h-3 mr-1" />
              Mark all read
            </Button>
          ) : undefined
        }
      />

      {sorted.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="No notifications yet"
          description="You'll be notified when someone matches your item or responds to your claim."
          data-ocid="notifications.empty_state"
        />
      ) : (
        <div
          className="bg-card mx-3 mt-3 rounded-xl border border-border shadow-card overflow-hidden"
          data-ocid="notifications.list"
        >
          {sorted.map((n, i) => (
            <NotifRow
              key={String(n.id)}
              n={n}
              index={i + 1}
              onTap={handleTap}
            />
          ))}
        </div>
      )}
    </div>
  );
}
