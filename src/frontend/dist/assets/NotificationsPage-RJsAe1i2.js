import { c as createLucideIcon, a as useBackend, f as useQueryClient, e as useNavigate, d as useQuery, j as jsxRuntimeExports, n as LoadingScreen, g as ue, B as Bell, o as NotificationType, i as cn } from "./index-B3kRMkUk.js";
import { E as EmptyState } from "./EmptyState-2xONxMIc.js";
import { P as PageHeader } from "./PageHeader-FJvrZreR.js";
import { B as Button } from "./button-C_Sdx-K0.js";
import { u as useMutation, X } from "./x-CCX_kk-4.js";
import { C as Check } from "./check-BAv4DujO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
function timeAgo(ts) {
  const ms = Number(ts);
  const date = ms > 1e12 ? new Date(ms / 1e6) : new Date(ms);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
const NOTIF_CFG = {
  [NotificationType.match_found]: {
    Icon: Bell,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    label: "Match Found"
  },
  [NotificationType.claim_approved]: {
    Icon: Check,
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary-foreground",
    label: "Claim Approved"
  },
  [NotificationType.claim_rejected]: {
    Icon: X,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    label: "Claim Rejected"
  },
  [NotificationType.claim_received]: {
    Icon: MessageCircle,
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    label: "Claim Received"
  }
};
function NotifRow({
  n,
  index,
  onTap
}) {
  const cfg = NOTIF_CFG[n.notificationType] ?? NOTIF_CFG[NotificationType.match_found];
  const { Icon } = cfg;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `notifications.item.${index}`,
      onClick: () => onTap(n),
      className: cn(
        "w-full text-left flex items-start gap-3 px-4 py-3.5 border-b border-border last:border-0",
        "transition-smooth hover:bg-muted/50 active:bg-muted",
        !n.read && "bg-primary/[0.03]"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "mt-0.5 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
              cfg.iconBg
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-4 h-4", cfg.iconColor) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-primary mb-0.5 uppercase tracking-wide", children: cfg.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-sm leading-snug",
                n.read ? "text-muted-foreground" : "text-foreground font-medium"
              ),
              children: n.message
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: timeAgo(n.createdAt) })
        ] }),
        !n.read && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "mt-2 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-primary",
            "aria-label": "Unread"
          }
        )
      ]
    }
  );
}
function NotificationsPage() {
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
    staleTime: 15e3
  });
  const markRead = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not ready");
      return actor.markNotificationRead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNotifications"] });
    }
  });
  const markAllRead = useMutation({
    mutationFn: async () => {
      if (!actor || !notifications) return;
      const unread = notifications.filter((n) => !n.read);
      await Promise.all(unread.map((n) => actor.markNotificationRead(n.id)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myNotifications"] });
      ue.success("All notifications marked as read");
    }
  });
  function handleTap(n) {
    if (!n.read) markRead.mutate(n.id);
    if (n.itemId !== void 0 && n.itemId !== null) {
      navigate({ to: "/item/$id", params: { id: String(n.itemId) } });
    }
  }
  const sorted = [...notifications ?? []].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );
  const unreadCount = sorted.filter((n) => !n.read).length;
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { label: "Loading notifications…" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", "data-ocid": "notifications.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: `Notifications${unreadCount > 0 ? ` (${unreadCount})` : ""}`,
        rightAction: unreadCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-8 text-xs text-primary",
            onClick: () => markAllRead.mutate(),
            disabled: markAllRead.isPending,
            "data-ocid": "notifications.mark_all_read_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3 h-3 mr-1" }),
              "Mark all read"
            ]
          }
        ) : void 0
      }
    ),
    sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: "🔔",
        title: "No notifications yet",
        description: "You'll be notified when someone matches your item or responds to your claim.",
        "data-ocid": "notifications.empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card mx-3 mt-3 rounded-xl border border-border shadow-card overflow-hidden",
        "data-ocid": "notifications.list",
        children: sorted.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          NotifRow,
          {
            n,
            index: i + 1,
            onTap: handleTap
          },
          String(n.id)
        ))
      }
    )
  ] });
}
export {
  NotificationsPage as default
};
