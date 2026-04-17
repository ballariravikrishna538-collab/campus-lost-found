import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import type { Claim, Item } from "@/types";
import { ClaimStatus, ItemStatus, ItemType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  MapPin,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function formatDate(ts: bigint): string {
  const ms = Number(ts);
  const date = ms > 1e12 ? new Date(ms / 1_000_000) : new Date(ms);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ItemDetailSkeleton() {
  return (
    <div>
      <Skeleton className="w-full h-72" />
      <div className="p-4 space-y-4">
        <Skeleton className="h-7 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-px w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}

function MatchCard({ match }: { match: Item }) {
  return (
    <Link
      to="/item/$id"
      params={{ id: String(match.id) }}
      data-ocid="item_detail.match_card"
      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/10 border border-secondary/30 hover:bg-secondary/20 transition-smooth"
    >
      <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        {match.imageUrl ? (
          <img
            src={match.imageUrl}
            alt={match.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            📦
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground truncate">
          {match.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {match.location}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <StatusBadge status={match.status} />
        </div>
      </div>
      <ArrowLeft className="w-4 h-4 rotate-180 text-muted-foreground flex-shrink-0" />
    </Link>
  );
}

function ClaimRequestCard({
  claim,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: {
  claim: Claim;
  onApprove: (id: bigint) => void;
  onReject: (id: bigint) => void;
  isApproving: boolean;
  isRejecting: boolean;
}) {
  return (
    <div
      className="p-3 rounded-xl border border-border bg-card space-y-2"
      data-ocid={`item_detail.claim_card.${Number(claim.id)}`}
    >
      <p className="text-sm text-foreground leading-relaxed">{claim.message}</p>
      <p className="text-[11px] text-muted-foreground">
        Submitted {formatDate(claim.createdAt)}
      </p>
      {claim.status === ClaimStatus.pending && (
        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            variant="default"
            className="flex-1 h-8 text-xs"
            onClick={() => onApprove(claim.id)}
            disabled={isApproving || isRejecting}
            data-ocid={`item_detail.approve_button.${Number(claim.id)}`}
          >
            {isApproving ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5 mr-1" />
                Approve
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="flex-1 h-8 text-xs"
            onClick={() => onReject(claim.id)}
            disabled={isApproving || isRejecting}
            data-ocid={`item_detail.reject_button.${Number(claim.id)}`}
          >
            {isRejecting ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 mr-1" />
                Reject
              </>
            )}
          </Button>
        </div>
      )}
      {claim.status !== ClaimStatus.pending && (
        <span
          className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full ${
            claim.status === ClaimStatus.approved
              ? "bg-secondary/20 text-secondary-foreground"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {claim.status === ClaimStatus.approved ? "✓ Approved" : "✗ Rejected"}
        </span>
      )}
    </div>
  );
}

export default function ItemDetailPage() {
  const { id } = useParams({ from: "/item/$id" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { actor, isFetching } = useBackend();
  const { identity, isAuthenticated } = useAuth();

  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimMessage, setClaimMessage] = useState("");
  const [resolveModalOpen, setResolveModalOpen] = useState(false);

  const itemId = BigInt(id);

  const {
    data: item,
    isLoading: isLoadingItem,
    error: itemError,
  } = useQuery<Item | null>({
    queryKey: ["item", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getItem(itemId);
    },
    enabled: !!actor && !isFetching,
  });

  const { data: matches = [] } = useQuery<Item[]>({
    queryKey: ["matchSuggestions", id],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMatchSuggestions(itemId);
    },
    enabled: !!actor && !isFetching && !!item,
  });

  const isOwner =
    isAuthenticated &&
    !!item &&
    !!identity &&
    identity.getPrincipal().toText() === item.userId.toText();

  const { data: claims = [] } = useQuery<Claim[]>({
    queryKey: ["claimsByItem", id],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listClaimsByItem(itemId);
    },
    enabled: !!actor && !isFetching && isOwner,
  });

  const submitClaimMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitClaim({ itemId, message });
    },
    onSuccess: () => {
      toast.success("Claim submitted!", {
        description: "The owner will review your request shortly.",
      });
      setClaimModalOpen(false);
      setClaimMessage("");
      queryClient.invalidateQueries({ queryKey: ["claimsByItem", id] });
    },
    onError: () =>
      toast.error("Failed to submit claim", {
        description: "Please try again.",
      }),
  });

  const approveClaimMutation = useMutation({
    mutationFn: async (claimId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveClaim(claimId);
    },
    onSuccess: () => {
      toast.success("Claim approved!");
      queryClient.invalidateQueries({ queryKey: ["claimsByItem", id] });
      queryClient.invalidateQueries({ queryKey: ["item", id] });
    },
    onError: () => toast.error("Failed to approve claim"),
  });

  const rejectClaimMutation = useMutation({
    mutationFn: async (claimId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.rejectClaim(claimId);
    },
    onSuccess: () => {
      toast.success("Claim rejected.");
      queryClient.invalidateQueries({ queryKey: ["claimsByItem", id] });
    },
    onError: () => toast.error("Failed to reject claim"),
  });

  const resolveItemMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.resolveItem(itemId);
    },
    onSuccess: () => {
      toast.success("Item marked as resolved!", {
        description: "This listing is now closed.",
      });
      setResolveModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["item", id] });
      queryClient.invalidateQueries({ queryKey: ["allItems"] });
    },
    onError: () => toast.error("Failed to resolve item"),
  });

  if (isLoadingItem || isFetching) return <ItemDetailSkeleton />;

  if (itemError || !item) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center"
        data-ocid="item_detail.error_state"
      >
        <p className="text-5xl mb-3">🔍</p>
        <h2 className="font-display font-bold text-xl text-foreground mb-1">
          Item Not Found
        </h2>
        <p className="text-muted-foreground text-sm mb-4">
          This item may have been removed or doesn't exist.
        </p>
        <Button variant="outline" onClick={() => navigate({ to: "/" })}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Home
        </Button>
      </div>
    );
  }

  const isFound = item.itemType === ItemType.found;
  const isResolved = item.status === ItemStatus.resolved;
  const canClaim = !isOwner && isFound && !isResolved && isAuthenticated;
  const pendingClaims = claims.filter((c) => c.status === ClaimStatus.pending);

  return (
    <div data-ocid="item_detail.page" className="pb-8">
      {/* Full-width hero image with overlaid back button */}
      <div className="relative w-full h-72 bg-muted overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-muted gap-2">
            <span className="text-6xl opacity-30">{isFound ? "📦" : "🔍"}</span>
            <p className="text-xs text-muted-foreground">No image provided</p>
          </div>
        )}
        {/* Top gradient for back button legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent pointer-events-none" />
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          aria-label="Go back"
          data-ocid="item_detail.back_button"
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-elevated hover:bg-card transition-smooth"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Main content */}
      <div className="px-4 pt-4 space-y-5">
        {/* Name & Badges */}
        <div className="space-y-2.5">
          <h1
            className="font-display font-bold text-2xl text-foreground leading-tight"
            data-ocid="item_detail.item_name"
          >
            {item.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                isFound
                  ? "bg-primary/15 text-primary"
                  : "bg-destructive/15 text-destructive"
              }`}
              data-ocid="item_detail.type_badge"
            >
              {isFound ? "✅ Found" : "🔍 Lost"}
            </span>
            <StatusBadge status={item.status} />
            <CategoryBadge category={item.category} />
          </div>
        </div>

        <Separator />

        {/* Details grid */}
        <div className="space-y-3" data-ocid="item_detail.details_section">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
                Location
              </p>
              <p className="text-sm font-medium text-foreground mt-0.5">
                {item.location}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Calendar className="w-4 h-4 text-secondary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
                Date {isFound ? "Found" : "Lost"}
              </p>
              <p className="text-sm font-medium text-foreground mt-0.5">
                {formatDate(item.date)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <User className="w-4 h-4 text-accent-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
                Posted by
              </p>
              <p className="text-sm font-medium text-foreground mt-0.5 truncate">
                {isOwner ? "You" : `User ${item.userId.toText().slice(0, 10)}…`}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div data-ocid="item_detail.description_section">
          <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
            Description
          </h2>
          <p className="text-sm text-foreground leading-relaxed">
            {item.description || "No description provided."}
          </p>
        </div>

        {/* Match suggestions */}
        {matches.length > 0 && (
          <>
            <Separator />
            <div data-ocid="item_detail.matches_section">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">✨</span>
                <h2 className="font-display font-semibold text-sm text-foreground">
                  Potential Match Found
                </h2>
                <span className="ml-auto bg-primary/15 text-primary text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {matches.length}
                </span>
              </div>
              <div className="space-y-2">
                {matches.map((match) => (
                  <MatchCard key={String(match.id)} match={match} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Owner: Claim Requests */}
        {isOwner && (
          <>
            <Separator />
            <div data-ocid="item_detail.claims_section">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Claim Requests
                </h2>
                {pendingClaims.length > 0 && (
                  <span className="bg-destructive/15 text-destructive text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                    {pendingClaims.length} pending
                  </span>
                )}
              </div>
              {claims.length === 0 ? (
                <p
                  className="text-sm text-muted-foreground text-center py-4 bg-muted/30 rounded-xl"
                  data-ocid="item_detail.claims_empty_state"
                >
                  No claim requests yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {claims.map((claim) => (
                    <ClaimRequestCard
                      key={String(claim.id)}
                      claim={claim}
                      onApprove={(cid) => approveClaimMutation.mutate(cid)}
                      onReject={(cid) => rejectClaimMutation.mutate(cid)}
                      isApproving={approveClaimMutation.isPending}
                      isRejecting={rejectClaimMutation.isPending}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Action buttons */}
        <div className="space-y-3 pt-2">
          {/* Non-owner found item: Request Claim */}
          {canClaim && (
            <Button
              className="w-full h-12 font-semibold text-base"
              onClick={() => setClaimModalOpen(true)}
              data-ocid="item_detail.claim_open_modal_button"
            >
              This Is Mine — Request Claim
            </Button>
          )}

          {/* Owner: Mark as Resolved */}
          {isOwner && !isResolved && (
            <Button
              variant="outline"
              className="w-full h-12 font-semibold border-2 border-primary text-primary hover:bg-primary/10"
              onClick={() => setResolveModalOpen(true)}
              data-ocid="item_detail.resolve_open_modal_button"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Resolved
            </Button>
          )}

          {/* Resolved state banner */}
          {isResolved && (
            <div
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-secondary/15 border border-secondary/30"
              data-ocid="item_detail.resolved_state"
            >
              <CheckCircle className="w-4 h-4 text-secondary-foreground" />
              <span className="text-sm font-medium text-secondary-foreground">
                This item has been resolved
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Claim Request Modal */}
      <Dialog open={claimModalOpen} onOpenChange={setClaimModalOpen}>
        <DialogContent
          className="max-w-sm mx-4"
          data-ocid="item_detail.claim_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Request Claim</DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-3">
            <p className="text-sm text-muted-foreground">
              Explain why this item belongs to you. The owner will review your
              message before approving.
            </p>
            <Textarea
              placeholder="Why are you claiming this item? (e.g. It has a red sticker on the back and my name written inside)"
              value={claimMessage}
              onChange={(e) => setClaimMessage(e.target.value)}
              className="min-h-[100px] resize-none"
              data-ocid="item_detail.claim_textarea"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setClaimModalOpen(false);
                setClaimMessage("");
              }}
              disabled={submitClaimMutation.isPending}
              data-ocid="item_detail.claim_cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => submitClaimMutation.mutate(claimMessage)}
              disabled={!claimMessage.trim() || submitClaimMutation.isPending}
              data-ocid="item_detail.claim_submit_button"
            >
              {submitClaimMutation.isPending ? (
                <LoadingSpinner size="sm" />
              ) : (
                "Submit Claim"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resolve Confirm Modal */}
      <Dialog open={resolveModalOpen} onOpenChange={setResolveModalOpen}>
        <DialogContent
          className="max-w-sm mx-4"
          data-ocid="item_detail.resolve_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Mark as Resolved?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-2">
            This will close the listing and notify others that the item has been
            recovered. This action cannot be undone.
          </p>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setResolveModalOpen(false)}
              disabled={resolveItemMutation.isPending}
              data-ocid="item_detail.resolve_cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => resolveItemMutation.mutate()}
              disabled={resolveItemMutation.isPending}
              data-ocid="item_detail.resolve_confirm_button"
            >
              {resolveItemMutation.isPending ? (
                <LoadingSpinner size="sm" />
              ) : (
                "Mark Resolved"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
