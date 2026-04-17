import { Button } from "@/components/ui/button";
import type { Item } from "@/types";
import { ItemType } from "@/types";
import { Link } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { StatusBadge } from "./StatusBadge";

interface ItemCardProps {
  item: Item;
  index?: number;
  onContact?: (item: Item) => void;
  showActions?: boolean;
}

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp);
  const date = ms > 1e12 ? new Date(ms / 1_000_000) : new Date(ms);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ItemCard({
  item,
  index = 1,
  onContact,
  showActions = true,
}: ItemCardProps) {
  const isLost = item.itemType === ItemType.lost;

  return (
    <div
      data-ocid={`items.item.${index}`}
      className="card-base border border-border overflow-hidden flex mb-3"
    >
      {/* Image thumbnail */}
      <Link
        to="/item/$id"
        params={{ id: item.id.toString() }}
        className="relative flex-shrink-0 w-28 h-28 bg-muted overflow-hidden"
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-3xl">{isLost ? "🔍" : "📦"}</span>
          </div>
        )}
        {/* Lost/Found badge overlay */}
        <span
          className={`absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
            isLost
              ? "bg-destructive/90 text-destructive-foreground"
              : "bg-primary/90 text-primary-foreground"
          }`}
        >
          {isLost ? "Lost" : "Found"}
        </span>
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
        <div>
          <Link
            to="/item/$id"
            params={{ id: item.id.toString() }}
            className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-1 hover:text-primary transition-colors"
          >
            {item.name}
          </Link>

          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
            <CategoryBadge category={item.category} />
            <StatusBadge status={item.status} />
          </div>

          <div className="flex items-center gap-1 mt-1.5">
            <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground truncate">
              {item.location}
            </span>
          </div>

          <div className="flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground">
              {isLost ? "Lost" : "Found"} {formatDate(item.date)}
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {showActions && (
          <div className="flex gap-2 mt-2">
            <Link to="/item/$id" params={{ id: item.id.toString() }}>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs px-3"
                data-ocid={`items.details_button.${index}`}
              >
                Details
              </Button>
            </Link>
            {onContact && (
              <Button
                size="sm"
                className="h-7 text-xs px-3"
                onClick={() => onContact(item)}
                data-ocid={`items.contact_button.${index}`}
              >
                {isLost ? "Claim" : "Message"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
