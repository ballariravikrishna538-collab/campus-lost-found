import { EmptyState } from "@/components/ui/EmptyState";
import { ItemCard } from "@/components/ui/ItemCard";
import { LoadingScreen, LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { ItemStatus, ItemType } from "@/types";
import type { Item, UserProfile } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit2, LogOut, Package, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── helpers ────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_PALETTE = [
  "bg-primary text-primary-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-accent text-accent-foreground",
];

function getAvatarColor(name: string): string {
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}

// ── stat chip ──────────────────────────────────────────────────────────────

function StatChip({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 flex-1">
      <span className="font-display font-bold text-xl text-foreground">
        {value}
      </span>
      <span className="text-[11px] text-muted-foreground text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

// ── edit modal ─────────────────────────────────────────────────────────────

interface EditModalProps {
  open: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (name: string, email: string) => void;
  isPending: boolean;
}

function EditProfileModal({
  open,
  profile,
  onClose,
  onSave,
  isPending,
}: EditModalProps) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSave(name.trim(), email.trim());
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm mx-4" data-ocid="profile.edit_dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-1">
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              data-ocid="profile.name_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              data-ocid="profile.email_input"
            />
          </div>
          <DialogFooter className="pt-2 gap-2 flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              data-ocid="profile.edit_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1"
              data-ocid="profile.edit_save_button"
            >
              {isPending ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── tab content ────────────────────────────────────────────────────────────

function ItemTabContent({
  items,
  type,
}: { items: Item[]; type: "lost" | "found" }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={type === "lost" ? "🔍" : "📦"}
        title={`No ${type} items yet`}
        description={`Items you report as ${type} will appear here.`}
        data-ocid={`profile.${type}_empty_state`}
      />
    );
  }
  return (
    <div className="pt-2 pb-4" data-ocid={`profile.${type}_items_list`}>
      {items.map((item, i) => (
        <ItemCard
          key={String(item.id)}
          item={item}
          index={i + 1}
          showActions={false}
        />
      ))}
    </div>
  );
}

// ── page ───────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { actor, isFetching } = useBackend();
  const { currentUser, identity, logout, isLoadingProfile } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);

  const { data: myItems, isLoading: isLoadingItems } = useQuery({
    queryKey: ["myItems", identity?.getPrincipal().toText()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.listItemsByUser(identity.getPrincipal());
    },
    enabled: !!actor && !isFetching && !!identity,
    staleTime: 60_000,
  });

  const updateProfile = useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateMyProfile({ name, email });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      toast.success("Profile updated!");
      setEditOpen(false);
    },
    onError: () => toast.error("Failed to update profile"),
  });

  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }

  if (isLoadingProfile) return <LoadingScreen label="Loading profile…" />;

  const displayName = currentUser?.name ?? "Campus User";
  const displayEmail = currentUser?.email ?? "";
  const items = myItems ?? [];
  const lostItems = items.filter((i: Item) => i.itemType === ItemType.lost);
  const foundItems = items.filter((i: Item) => i.itemType === ItemType.found);
  const resolvedCount = items.filter(
    (i: Item) => i.status === ItemStatus.resolved,
  ).length;

  return (
    <div className="flex flex-col" data-ocid="profile.page">
      <PageHeader
        title="My Profile"
        rightAction={
          currentUser ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={() => setEditOpen(true)}
              aria-label="Edit profile"
              data-ocid="profile.edit_button"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          ) : undefined
        }
      />

      {/* Avatar + info */}
      <div className="bg-gradient-to-b from-primary/10 to-background px-4 pt-6 pb-4 flex flex-col items-center gap-3">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-elevated font-display font-bold text-2xl ${getAvatarColor(displayName)}`}
          data-ocid="profile.avatar"
        >
          {isLoadingProfile ? (
            <LoadingSpinner size="sm" />
          ) : (
            getInitials(displayName)
          )}
        </div>
        <div className="text-center">
          <h2 className="font-display font-bold text-lg text-foreground">
            {displayName}
          </h2>
          {displayEmail && (
            <p className="text-sm text-muted-foreground mt-0.5">
              {displayEmail}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-3">
        <div
          className="bg-card border border-border rounded-xl px-4 py-3 flex items-center divide-x divide-border shadow-card"
          data-ocid="profile.stats"
        >
          <StatChip value={items.length} label="Posted" />
          <StatChip value={foundItems.length} label="Found" />
          <StatChip value={resolvedCount} label="Resolved" />
        </div>
      </div>

      {/* Tabs: My Lost / My Found */}
      {isLoadingItems ? (
        <div
          className="flex justify-center py-10"
          data-ocid="profile.loading_state"
        >
          <LoadingSpinner size="md" label="Loading your items…" />
        </div>
      ) : (
        <Tabs defaultValue="lost" className="flex-1 flex flex-col">
          <TabsList className="mx-4 mb-1 grid grid-cols-2 bg-muted rounded-lg h-10">
            <TabsTrigger
              value="lost"
              data-ocid="profile.lost_tab"
              className="rounded-md text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <Search className="w-3.5 h-3.5 mr-1.5" />
              Lost ({lostItems.length})
            </TabsTrigger>
            <TabsTrigger
              value="found"
              data-ocid="profile.found_tab"
              className="rounded-md text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <Package className="w-3.5 h-3.5 mr-1.5" />
              Found ({foundItems.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lost" className="px-4 mt-0 flex-1">
            <ItemTabContent items={lostItems} type="lost" />
          </TabsContent>
          <TabsContent value="found" className="px-4 mt-0 flex-1">
            <ItemTabContent items={foundItems} type="found" />
          </TabsContent>
        </Tabs>
      )}

      {/* Logout + footer */}
      <div className="px-4 py-4 border-t border-border mt-2">
        <Button
          variant="outline"
          className="w-full border-destructive/50 text-destructive hover:bg-destructive/5 hover:border-destructive"
          onClick={handleLogout}
          data-ocid="profile.logout_button"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>

      <footer className="px-4 pb-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* Edit modal */}
      {editOpen && currentUser && (
        <EditProfileModal
          open={editOpen}
          profile={currentUser}
          onClose={() => setEditOpen(false)}
          onSave={(name, email) => updateProfile.mutate({ name, email })}
          isPending={updateProfile.isPending}
        />
      )}
    </div>
  );
}
