import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBackend } from "@/hooks/useBackend";
import { Category, ItemType } from "@/types";
import { CATEGORY_LABELS } from "@/types";
import type { Item } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Calendar, MapPin, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type FilterType = "all" | "lost" | "found";
type DateFilter = "all" | "today" | "week";

const TYPE_FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "lost", label: "Lost" },
  { value: "found", label: "Found" },
];

const DATE_FILTERS: { value: DateFilter; label: string }[] = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
];

const ALL_CATEGORIES = Object.values(Category);

function getDateThreshold(filter: DateFilter): number {
  const now = Date.now();
  if (filter === "today") return now - 24 * 60 * 60 * 1000;
  if (filter === "week") return now - 7 * 24 * 60 * 60 * 1000;
  return 0;
}

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp);
  const date = ms > 1e12 ? new Date(ms / 1_000_000) : new Date(ms);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getSearchParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

// Grid-style item card for 2-column layout
function GridItemCard({ item, index }: { item: Item; index: number }) {
  const navigate = useNavigate();
  const isLost = item.itemType === ItemType.lost;

  return (
    <button
      type="button"
      data-ocid={`search.item.${index}`}
      onClick={() =>
        navigate({ to: "/item/$id", params: { id: item.id.toString() } })
      }
      className="card-base border border-border overflow-hidden cursor-pointer hover:shadow-elevated hover:-translate-y-0.5 transition-smooth flex flex-col w-full text-left"
    >
      {/* Image */}
      <div className="relative aspect-square w-full bg-muted overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-4xl">{isLost ? "🔍" : "📦"}</span>
          </div>
        )}
        {/* Type badge overlay */}
        <span
          className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isLost
              ? "bg-destructive text-destructive-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {isLost ? "Lost" : "Found"}
        </span>
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1.5 flex-1">
        <h3 className="font-display font-semibold text-xs text-foreground leading-tight line-clamp-2">
          {item.name}
        </h3>

        <div className="flex flex-wrap gap-1">
          <CategoryBadge category={item.category} />
        </div>

        <div className="flex items-center gap-1 mt-auto">
          <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <span className="text-[10px] text-muted-foreground truncate">
            {item.location}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <span className="text-[10px] text-muted-foreground">
            {formatDate(item.date)}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function SearchPage() {
  const { actor, isFetching } = useBackend();

  // Initialise from URL params
  const [search, setSearch] = useState(() => getSearchParams().get("q") ?? "");
  const [typeFilter, setTypeFilter] = useState<FilterType>(
    () => (getSearchParams().get("type") as FilterType) ?? "all",
  );
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">(
    () => (getSearchParams().get("cat") as Category) ?? "all",
  );
  const [dateFilter, setDateFilter] = useState<DateFilter>(
    () => (getSearchParams().get("date") as DateFilter) ?? "all",
  );

  // Sync filters → URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (typeFilter !== "all") params.set("type", typeFilter);
    if (categoryFilter !== "all") params.set("cat", categoryFilter);
    if (dateFilter !== "all") params.set("date", dateFilter);
    const qs = params.toString();
    const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    window.history.replaceState(null, "", newUrl);
  }, [search, typeFilter, categoryFilter, dateFilter]);

  const { data: allItems, isLoading } = useQuery({
    queryKey: ["allItems"],
    queryFn: async () => {
      if (!actor) return { items: [], total: 0n, offset: 0n, limit: 200n };
      return actor.listAllItems(0n, 200n);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });

  const dateThreshold = useMemo(
    () => getDateThreshold(dateFilter),
    [dateFilter],
  );

  const filtered = useMemo(() => {
    return (allItems?.items ?? []).filter((item: Item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "lost" && item.itemType === ItemType.lost) ||
        (typeFilter === "found" && item.itemType === ItemType.found);

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      const itemMs = Number(item.date);
      const itemDate = itemMs > 1e12 ? itemMs / 1_000_000 : itemMs;
      const matchesDate = dateFilter === "all" || itemDate >= dateThreshold;

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [allItems, search, typeFilter, categoryFilter, dateFilter, dateThreshold]);

  const hasActiveFilters =
    search !== "" ||
    typeFilter !== "all" ||
    categoryFilter !== "all" ||
    dateFilter !== "all";

  function clearFilters() {
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setDateFilter("all");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
        {/* Search input */}
        <div className="px-4 pt-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 bg-muted/40 border-border"
              data-ocid="search.search_input"
            />
          </div>
        </div>

        {/* Filter row */}
        <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {/* Category dropdown */}
          <Select
            value={categoryFilter}
            onValueChange={(v) => setCategoryFilter(v as Category | "all")}
          >
            <SelectTrigger
              className="h-8 text-xs min-w-[110px] max-w-[130px] bg-muted/40 border-border"
              data-ocid="search.category_select"
            >
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {ALL_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {CATEGORY_LABELS[cat] ?? cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type toggle pills */}
          <div
            className="flex gap-1 flex-shrink-0"
            data-ocid="search.type_filter"
          >
            {TYPE_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTypeFilter(value)}
                data-ocid={`search.type_${value}.tab`}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-smooth ${
                  typeFilter === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Date filter pills */}
          <div
            className="flex gap-1 flex-shrink-0"
            data-ocid="search.date_filter"
          >
            {DATE_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setDateFilter(value)}
                data-ocid={`search.date_${value}.tab`}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-smooth ${
                  dateFilter === value
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <p
          className="text-xs text-muted-foreground"
          data-ocid="search.results_count"
        >
          {isLoading
            ? "Searching..."
            : `${filtered.length} item${filtered.length !== 1 ? "s" : ""} found`}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-primary font-medium hover:underline transition-smooth"
            data-ocid="search.clear_filters"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Content area */}
      <div className="flex-1 px-3 pb-6">
        {isLoading ? (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="search.loading_state"
          >
            <LoadingSpinner size="md" />
            <p className="text-sm text-muted-foreground">Loading items...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div data-ocid="search.empty_state" className="mt-4">
            <EmptyState
              icon="🔍"
              title="No items found"
              description={
                search
                  ? `No results for "${search}". Try different keywords or clear filters.`
                  : "No items match your current filters. Try adjusting or clearing them."
              }
              actionLabel={hasActiveFilters ? "Clear Filters" : undefined}
              onAction={hasActiveFilters ? clearFilters : undefined}
            />
          </div>
        ) : (
          /* 2-column grid */
          <div
            className="grid grid-cols-2 gap-3 mt-2"
            data-ocid="search.items_list"
          >
            {filtered.map((item, i) => (
              <GridItemCard
                key={item.id.toString()}
                item={item}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
