import { EmptyState } from "@/components/ui/EmptyState";
import { ItemCard } from "@/components/ui/ItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import type { Item } from "@/types";
import { ItemType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Flag,
  Link2,
  MapPin,
  Package,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Data hooks ────────────────────────────────────────────────────────────────

function useRecentItems() {
  const { actor, isFetching } = useBackend();
  return useQuery<Item[]>({
    queryKey: ["recentItems"],
    queryFn: async () => {
      if (!actor) return [];
      const page = await actor.listAllItems(BigInt(0), BigInt(6));
      return page.items;
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

function useAllItemsStats() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["allItemsStats"],
    queryFn: async () => {
      if (!actor) return { lost: 0, found: 0, resolved: 0 };
      const [lostPage, foundPage, allPage] = await Promise.all([
        actor.listItemsByType(ItemType.lost, BigInt(0), BigInt(1)),
        actor.listItemsByType(ItemType.found, BigInt(0), BigInt(1)),
        actor.listAllItems(BigInt(0), BigInt(1)),
      ]);
      const lost = Number(lostPage.total);
      const found = Number(foundPage.total);
      const total = Number(allPage.total);
      return { lost, found, resolved: Math.max(0, total - lost - found) };
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

function useMatchSuggestions(lostItemId?: bigint) {
  const { actor, isFetching } = useBackend();
  return useQuery<Item[]>({
    queryKey: ["matchSuggestions", lostItemId?.toString()],
    queryFn: async () => {
      if (!actor || lostItemId === undefined) return [];
      return actor.getMatchSuggestions(lostItemId);
    },
    enabled: !!actor && !isFetching && lostItemId !== undefined,
    staleTime: 60_000,
  });
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatBar({
  lost,
  found,
  resolved,
}: {
  lost: number;
  found: number;
  resolved: number;
}) {
  const stats = [
    {
      label: "Lost",
      value: lost,
      icon: Search,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      label: "Found",
      value: found,
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Resolved",
      value: resolved,
      icon: ShieldCheck,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];
  return (
    <div
      data-ocid="home.stats_bar"
      className="grid grid-cols-3 gap-2 mx-4 mb-5"
    >
      {stats.map(({ label, value, icon: Icon, color, bg }, idx) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.06 }}
          className="card-base border border-border p-3 flex flex-col items-center gap-1"
        >
          <div
            className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center`}
          >
            <Icon className={`w-3.5 h-3.5 ${color}`} />
          </div>
          <span className="font-display font-bold text-xl leading-none text-foreground">
            {value}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ActionCard({
  to,
  icon: Icon,
  title,
  subtitle,
  gradient,
  ocid,
}: {
  to: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  gradient: string;
  ocid: string;
}) {
  return (
    <Link to={to} data-ocid={ocid} className="flex-1 group">
      <motion.div
        whileTap={{ scale: 0.96 }}
        className={`rounded-2xl p-4 flex flex-col gap-3 ${gradient} shadow-card transition-smooth group-hover:shadow-elevated`}
      >
        <div className="w-10 h-10 rounded-xl bg-card/20 backdrop-blur-sm flex items-center justify-center">
          <Icon className="w-5 h-5 text-card" strokeWidth={2.5} />
        </div>
        <div>
          <p className="font-display font-bold text-card text-sm leading-tight">
            {title}
          </p>
          <p className="text-card/70 text-xs mt-0.5 leading-snug">{subtitle}</p>
        </div>
      </motion.div>
    </Link>
  );
}

function HorizontalItemScroll({
  items,
  ocid,
}: { items: Item[]; ocid: string }) {
  return (
    <div
      data-ocid={ocid}
      className="flex gap-3 overflow-x-auto pb-2 px-4"
      style={{ scrollbarWidth: "none" }}
    >
      {items.map((item, i) => (
        <div key={item.id.toString()} className="flex-shrink-0 w-[280px]">
          <ItemCard item={item} index={i + 1} showActions={false} />
        </div>
      ))}
    </div>
  );
}

function HorizontalSkeleton() {
  return (
    <div className="flex gap-3 overflow-x-hidden pb-2 px-4">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="flex-shrink-0 w-[280px] h-28 rounded-lg overflow-hidden"
        >
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}

function MatchPair({
  lost,
  found,
  index,
}: { lost: Item; found: Item; index: number }) {
  function ItemThumb({ item }: { item: Item }) {
    const isLost = item.itemType === ItemType.lost;
    return (
      <Link
        to="/item/$id"
        params={{ id: item.id.toString() }}
        className="flex-1 min-w-0"
      >
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted flex-shrink-0">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl">
                {isLost ? "🔍" : "📦"}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-foreground truncate leading-tight">
              {item.name}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-2.5 h-2.5 text-muted-foreground flex-shrink-0" />
              <p className="text-[10px] text-muted-foreground truncate">
                {item.location}
              </p>
            </div>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-medium mt-0.5 inline-block ${
                isLost
                  ? "bg-destructive/15 text-destructive"
                  : "bg-primary/15 text-primary"
              }`}
            >
              {isLost ? "Lost" : "Found"}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      data-ocid={`home.match_pair.${index}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex-shrink-0 w-[320px] card-base border border-border p-3 flex items-center gap-2"
    >
      <ItemThumb item={lost} />
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
        <Link2 className="w-3.5 h-3.5 text-primary" />
      </div>
      <ItemThumb item={found} />
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { currentUser } = useAuth();
  const { data: recentItems = [], isLoading: loadingItems } = useRecentItems();
  const { data: stats, isLoading: loadingStats } = useAllItemsStats();

  const lostItem = recentItems.find((i) => i.itemType === ItemType.lost);
  const { data: matchItems = [], isLoading: loadingMatches } =
    useMatchSuggestions(lostItem?.id);

  const matchPairs: { lost: Item; found: Item }[] = lostItem
    ? matchItems
        .filter((m) => m.itemType === ItemType.found)
        .map((found) => ({ lost: lostItem, found }))
    : [];

  const displayName = currentUser?.name
    ? currentUser.name.split(" ")[0]
    : "there";

  return (
    <div
      data-ocid="home.page"
      className="pb-24 bg-background min-h-screen max-w-md mx-auto"
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 bg-card border-b border-border px-4 pt-10 pb-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-card">
              <Search
                className="w-4 h-4 text-primary-foreground"
                strokeWidth={2.5}
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-base text-foreground leading-tight">
                Campus Lost &amp; Found
              </h1>
              <p className="text-xs text-muted-foreground">
                Hi, {displayName} 👋
              </p>
            </div>
          </div>
          <Link
            to="/notifications"
            data-ocid="home.notifications_link"
            className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-smooth hover:bg-primary/10 active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive border-2 border-card" />
          </Link>
        </div>

        {/* Inline search bar */}
        <Link
          to="/search"
          data-ocid="home.search_input"
          aria-label="Search items"
        >
          <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-muted border border-input text-muted-foreground text-sm cursor-pointer hover:border-primary/50 transition-colors">
            <Search className="w-4 h-4 flex-shrink-0" />
            <span className="text-muted-foreground">
              Search for lost or found items...
            </span>
          </div>
        </Link>
      </header>

      {/* ── Hero Action Cards ── */}
      <div className="px-4 pt-5 mb-5">
        <div className="flex gap-3" data-ocid="home.action_cards">
          <ActionCard
            to="/report/lost"
            icon={Search}
            title="Report Lost Item"
            subtitle="I lost something on campus"
            gradient="bg-gradient-to-br from-primary to-primary/70"
            ocid="home.report_lost_button"
          />
          <ActionCard
            to="/report/found"
            icon={Plus}
            title="Report Found Item"
            subtitle="I found something here"
            gradient="bg-gradient-to-br from-secondary to-accent"
            ocid="home.report_found_button"
          />
        </div>
      </div>

      {/* ── Quick Stats Bar ── */}
      {loadingStats ? (
        <div className="grid grid-cols-3 gap-2 mx-4 mb-5">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[76px] rounded-lg" />
          ))}
        </div>
      ) : (
        <StatBar
          lost={stats?.lost ?? 0}
          found={stats?.found ?? 0}
          resolved={stats?.resolved ?? 0}
        />
      )}

      {/* ── Recent Listings ── */}
      <section className="mb-6" data-ocid="home.recent_listings_section">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-display font-semibold text-sm text-foreground">
            Recent Listings
          </h2>
          <Link
            to="/search"
            data-ocid="home.view_all_link"
            className="text-xs text-primary font-medium hover:text-primary/80 transition-colors"
          >
            View all →
          </Link>
        </div>

        {loadingItems ? (
          <HorizontalSkeleton />
        ) : recentItems.length === 0 ? (
          <div className="px-4" data-ocid="home.listings_empty_state">
            <EmptyState
              icon="📭"
              title="No items yet"
              description="Be the first to report a lost or found item."
              className="py-8"
            />
          </div>
        ) : (
          <HorizontalItemScroll
            items={recentItems}
            ocid="home.recent_listings_list"
          />
        )}
      </section>

      {/* ── Smart Matches ── */}
      <section
        className="mb-6 bg-muted/30 py-5"
        data-ocid="home.matches_section"
      >
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-primary/15 flex items-center justify-center">
              <Link2 className="w-3 h-3 text-primary" />
            </div>
            <h2 className="font-display font-semibold text-sm text-foreground">
              Smart Matches
            </h2>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold tracking-wide">
            AI-powered
          </span>
        </div>

        {loadingMatches ? (
          <HorizontalSkeleton />
        ) : matchPairs.length === 0 ? (
          <div className="px-4" data-ocid="home.matches_empty_state">
            <EmptyState
              icon="🔗"
              title="No matches yet"
              description="Match suggestions appear when lost and found items look similar."
              className="py-6"
            />
          </div>
        ) : (
          <div
            data-ocid="home.matches_list"
            className="flex gap-3 overflow-x-auto pb-2 px-4"
            style={{ scrollbarWidth: "none" }}
          >
            {matchPairs.map((pair, i) => (
              <MatchPair
                key={`${pair.lost.id}-${pair.found.id}`}
                lost={pair.lost}
                found={pair.found}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Browse by Type ── */}
      <section className="px-4 mb-6" data-ocid="home.browse_section">
        <h2 className="font-display font-semibold text-sm text-foreground mb-3">
          Browse Items
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/search"
            data-ocid="home.browse_lost_button"
            className="card-base border border-border p-4 flex flex-col items-center gap-2 hover:border-destructive/40 transition-smooth group"
          >
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
              <Search className="w-5 h-5 text-destructive" />
            </div>
            <p className="font-display font-semibold text-sm text-foreground">
              Lost Items
            </p>
            <p className="text-[11px] text-muted-foreground text-center leading-snug">
              Browse all reported lost items
            </p>
          </Link>
          <Link
            to="/search"
            data-ocid="home.browse_found_button"
            className="card-base border border-border p-4 flex flex-col items-center gap-2 hover:border-primary/40 transition-smooth group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Flag className="w-5 h-5 text-primary" />
            </div>
            <p className="font-display font-semibold text-sm text-foreground">
              Found Items
            </p>
            <p className="text-[11px] text-muted-foreground text-center leading-snug">
              Browse all reported found items
            </p>
          </Link>
        </div>
      </section>

      {/* ── Safety tip strip ── */}
      <div className="mx-4 mb-4 p-3 rounded-xl bg-muted/50 border border-border flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
        <span className="text-xs text-muted-foreground leading-relaxed">
          Items are visible to all campus members. Always meet in public areas.
        </span>
      </div>
    </div>
  );
}
