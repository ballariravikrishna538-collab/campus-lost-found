// Re-export types from the backend declarations (interfaces/type aliases only)
export type {
  Item,
  ItemId,
  Claim,
  ClaimId,
  Notification,
  NotificationId,
  UserProfile,
  UserId,
  Timestamp,
  CreateItemRequest,
  CreateClaimRequest,
  UpdateItemRequest,
  UpdateUserRequest,
  ItemsPage,
} from "../backend.d.ts";

// Re-export enums as values+types from the runtime backend module
export {
  ItemType,
  ItemStatus,
  Category,
  ClaimStatus,
  NotificationType,
} from "../backend";
export type {
  ItemType as ItemTypeType,
  ItemStatus as ItemStatusType,
  Category as CategoryType,
} from "../backend";

export interface SampleItem {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  date: string;
  imageUrl?: string;
  itemType: "lost" | "found";
  status: "open" | "matched" | "resolved";
}

export const CATEGORY_LABELS: Record<string, string> = {
  electronics: "Electronics",
  clothing: "Clothing",
  documents: "Documents",
  accessories: "Accessories",
  keys: "Keys",
  books: "Books",
  other: "Other",
};

export const CATEGORY_COLORS: Record<string, string> = {
  electronics: "bg-primary/15 text-primary",
  clothing: "bg-accent/20 text-accent-foreground",
  documents: "bg-secondary/20 text-secondary-foreground",
  accessories: "bg-primary/10 text-primary",
  keys: "bg-secondary/30 text-secondary-foreground",
  books: "bg-accent/15 text-accent-foreground",
  other: "bg-muted text-muted-foreground",
};

export const CATEGORY_ICONS: Record<string, string> = {
  electronics: "📱",
  clothing: "👕",
  documents: "📄",
  accessories: "👜",
  keys: "🔑",
  books: "📚",
  other: "📦",
};
