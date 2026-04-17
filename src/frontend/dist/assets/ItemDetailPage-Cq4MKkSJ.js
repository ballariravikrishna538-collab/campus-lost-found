import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, i as cn, k as useParams, e as useNavigate, f as useQueryClient, a as useBackend, u as useAuth, d as useQuery, I as ItemType, l as ItemStatus, m as ClaimStatus, U as User, L as LoadingSpinner, g as ue, b as Link } from "./index-B3kRMkUk.js";
import { C as CategoryBadge, a as Calendar } from "./CategoryBadge-D0eHMT-b.js";
import { S as StatusBadge } from "./StatusBadge-D6ZnRgVQ.js";
import { B as Button } from "./button-C_Sdx-K0.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-Baqw7R1F.js";
import { P as Primitive } from "./index-BEnBZagZ.js";
import { S as Skeleton } from "./skeleton-ReD8M-JN.js";
import { T as Textarea } from "./textarea-CFO4NyYA.js";
import { u as useMutation, A as ArrowLeft } from "./x-CCX_kk-4.js";
import { M as MapPin } from "./map-pin-D5rAQqNa.js";
import "./index-Y1WSDvOi.js";
import "./Combination-r_aLKKAQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function formatDate(ts) {
  const ms = Number(ts);
  const date = ms > 1e12 ? new Date(ms / 1e6) : new Date(ms);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
function ItemDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-72" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-px w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-px w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" })
    ] })
  ] });
}
function MatchCard({ match }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/item/$id",
      params: { id: String(match.id) },
      "data-ocid": "item_detail.match_card",
      className: "flex items-center gap-3 p-3 rounded-xl bg-secondary/10 border border-secondary/30 hover:bg-secondary/20 transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0", children: match.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: match.imageUrl,
            alt: match.name,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-2xl", children: "📦" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: match.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: match.location }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: match.status }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 rotate-180 text-muted-foreground flex-shrink-0" })
      ]
    }
  );
}
function ClaimRequestCard({
  claim,
  onApprove,
  onReject,
  isApproving,
  isRejecting
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-3 rounded-xl border border-border bg-card space-y-2",
      "data-ocid": `item_detail.claim_card.${Number(claim.id)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: claim.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
          "Submitted ",
          formatDate(claim.createdAt)
        ] }),
        claim.status === ClaimStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "default",
              className: "flex-1 h-8 text-xs",
              onClick: () => onApprove(claim.id),
              disabled: isApproving || isRejecting,
              "data-ocid": `item_detail.approve_button.${Number(claim.id)}`,
              children: isApproving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 mr-1" }),
                "Approve"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "destructive",
              className: "flex-1 h-8 text-xs",
              onClick: () => onReject(claim.id),
              disabled: isApproving || isRejecting,
              "data-ocid": `item_detail.reject_button.${Number(claim.id)}`,
              children: isRejecting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 mr-1" }),
                "Reject"
              ] })
            }
          )
        ] }),
        claim.status !== ClaimStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-block text-[11px] font-medium px-2 py-0.5 rounded-full ${claim.status === ClaimStatus.approved ? "bg-secondary/20 text-secondary-foreground" : "bg-destructive/10 text-destructive"}`,
            children: claim.status === ClaimStatus.approved ? "✓ Approved" : "✗ Rejected"
          }
        )
      ]
    }
  );
}
function ItemDetailPage() {
  const { id } = useParams({ from: "/item/$id" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor, isFetching } = useBackend();
  const { identity, isAuthenticated } = useAuth();
  const [claimModalOpen, setClaimModalOpen] = reactExports.useState(false);
  const [claimMessage, setClaimMessage] = reactExports.useState("");
  const [resolveModalOpen, setResolveModalOpen] = reactExports.useState(false);
  const itemId = BigInt(id);
  const {
    data: item,
    isLoading: isLoadingItem,
    error: itemError
  } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getItem(itemId);
    },
    enabled: !!actor && !isFetching
  });
  const { data: matches = [] } = useQuery({
    queryKey: ["matchSuggestions", id],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMatchSuggestions(itemId);
    },
    enabled: !!actor && !isFetching && !!item
  });
  const isOwner = isAuthenticated && !!item && !!identity && identity.getPrincipal().toText() === item.userId.toText();
  const { data: claims = [] } = useQuery({
    queryKey: ["claimsByItem", id],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listClaimsByItem(itemId);
    },
    enabled: !!actor && !isFetching && isOwner
  });
  const submitClaimMutation = useMutation({
    mutationFn: async (message) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitClaim({ itemId, message });
    },
    onSuccess: () => {
      ue.success("Claim submitted!", {
        description: "The owner will review your request shortly."
      });
      setClaimModalOpen(false);
      setClaimMessage("");
      queryClient.invalidateQueries({ queryKey: ["claimsByItem", id] });
    },
    onError: () => ue.error("Failed to submit claim", {
      description: "Please try again."
    })
  });
  const approveClaimMutation = useMutation({
    mutationFn: async (claimId) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveClaim(claimId);
    },
    onSuccess: () => {
      ue.success("Claim approved!");
      queryClient.invalidateQueries({ queryKey: ["claimsByItem", id] });
      queryClient.invalidateQueries({ queryKey: ["item", id] });
    },
    onError: () => ue.error("Failed to approve claim")
  });
  const rejectClaimMutation = useMutation({
    mutationFn: async (claimId) => {
      if (!actor) throw new Error("Not connected");
      return actor.rejectClaim(claimId);
    },
    onSuccess: () => {
      ue.success("Claim rejected.");
      queryClient.invalidateQueries({ queryKey: ["claimsByItem", id] });
    },
    onError: () => ue.error("Failed to reject claim")
  });
  const resolveItemMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.resolveItem(itemId);
    },
    onSuccess: () => {
      ue.success("Item marked as resolved!", {
        description: "This listing is now closed."
      });
      setResolveModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["item", id] });
      queryClient.invalidateQueries({ queryKey: ["allItems"] });
    },
    onError: () => ue.error("Failed to resolve item")
  });
  if (isLoadingItem || isFetching) return /* @__PURE__ */ jsxRuntimeExports.jsx(ItemDetailSkeleton, {});
  if (itemError || !item) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] p-6 text-center",
        "data-ocid": "item_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl mb-3", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-1", children: "Item Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "This item may have been removed or doesn't exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => navigate({ to: "/" }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
            "Go Home"
          ] })
        ]
      }
    );
  }
  const isFound = item.itemType === ItemType.found;
  const isResolved = item.status === ItemStatus.resolved;
  const canClaim = !isOwner && isFound && !isResolved && isAuthenticated;
  const pendingClaims = claims.filter((c) => c.status === ClaimStatus.pending);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "item_detail.page", className: "pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-72 bg-muted overflow-hidden", children: [
      item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: item.imageUrl,
          alt: item.name,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center bg-muted gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl opacity-30", children: isFound ? "📦" : "🔍" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No image provided" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/" }),
          "aria-label": "Go back",
          "data-ocid": "item_detail.back_button",
          className: "absolute top-4 left-4 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-elevated hover:bg-card transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 text-foreground" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "font-display font-bold text-2xl text-foreground leading-tight",
            "data-ocid": "item_detail.item_name",
            children: item.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${isFound ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"}`,
              "data-ocid": "item_detail.type_badge",
              children: isFound ? "✅ Found" : "🔍 Lost"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: item.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: item.category })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "item_detail.details_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-medium", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mt-0.5", children: item.location })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-secondary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-medium", children: [
              "Date ",
              isFound ? "Found" : "Lost"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mt-0.5", children: formatDate(item.date) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-accent-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-medium", children: "Posted by" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mt-0.5 truncate", children: isOwner ? "You" : `User ${item.userId.toText().slice(0, 10)}…` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "item_detail.description_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: item.description || "No description provided." })
      ] }),
      matches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "item_detail.matches_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "✨" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Potential Match Found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto bg-primary/15 text-primary text-[11px] font-semibold px-2 py-0.5 rounded-full", children: matches.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: matches.map((match) => /* @__PURE__ */ jsxRuntimeExports.jsx(MatchCard, { match }, String(match.id))) })
        ] })
      ] }),
      isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "item_detail.claims_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Claim Requests" }),
            pendingClaims.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-destructive/15 text-destructive text-[11px] font-bold px-1.5 py-0.5 rounded-full", children: [
              pendingClaims.length,
              " pending"
            ] })
          ] }),
          claims.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm text-muted-foreground text-center py-4 bg-muted/30 rounded-xl",
              "data-ocid": "item_detail.claims_empty_state",
              children: "No claim requests yet."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: claims.map((claim) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ClaimRequestCard,
            {
              claim,
              onApprove: (cid) => approveClaimMutation.mutate(cid),
              onReject: (cid) => rejectClaimMutation.mutate(cid),
              isApproving: approveClaimMutation.isPending,
              isRejecting: rejectClaimMutation.isPending
            },
            String(claim.id)
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-2", children: [
        canClaim && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full h-12 font-semibold text-base",
            onClick: () => setClaimModalOpen(true),
            "data-ocid": "item_detail.claim_open_modal_button",
            children: "This Is Mine — Request Claim"
          }
        ),
        isOwner && !isResolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full h-12 font-semibold border-2 border-primary text-primary hover:bg-primary/10",
            onClick: () => setResolveModalOpen(true),
            "data-ocid": "item_detail.resolve_open_modal_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 mr-2" }),
              "Mark as Resolved"
            ]
          }
        ),
        isResolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-center gap-2 p-3 rounded-xl bg-secondary/15 border border-secondary/30",
            "data-ocid": "item_detail.resolved_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-secondary-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-secondary-foreground", children: "This item has been resolved" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: claimModalOpen, onOpenChange: setClaimModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-sm mx-4",
        "data-ocid": "item_detail.claim_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Request Claim" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Explain why this item belongs to you. The owner will review your message before approving." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                placeholder: "Why are you claiming this item? (e.g. It has a red sticker on the back and my name written inside)",
                value: claimMessage,
                onChange: (e) => setClaimMessage(e.target.value),
                className: "min-h-[100px] resize-none",
                "data-ocid": "item_detail.claim_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                onClick: () => {
                  setClaimModalOpen(false);
                  setClaimMessage("");
                },
                disabled: submitClaimMutation.isPending,
                "data-ocid": "item_detail.claim_cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => submitClaimMutation.mutate(claimMessage),
                disabled: !claimMessage.trim() || submitClaimMutation.isPending,
                "data-ocid": "item_detail.claim_submit_button",
                children: submitClaimMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : "Submit Claim"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: resolveModalOpen, onOpenChange: setResolveModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-sm mx-4",
        "data-ocid": "item_detail.resolve_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Mark as Resolved?" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-2", children: "This will close the listing and notify others that the item has been recovered. This action cannot be undone." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                onClick: () => setResolveModalOpen(false),
                disabled: resolveItemMutation.isPending,
                "data-ocid": "item_detail.resolve_cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => resolveItemMutation.mutate(),
                disabled: resolveItemMutation.isPending,
                "data-ocid": "item_detail.resolve_confirm_button",
                children: resolveItemMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : "Mark Resolved"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  ItemDetailPage as default
};
