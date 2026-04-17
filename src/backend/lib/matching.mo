import List "mo:core/List";
import Text "mo:core/Text";
import ItemTypes "../types/items";

module {
  // Split text into lowercase words for overlap comparison
  func words(t : Text) : [Text] {
    let lower = t.toLower();
    let parts = lower.split(#char ' ');
    var result : [Text] = [];
    for (w in parts) {
      let trimmed = w.trim(#char ' ');
      if (not trimmed.isEmpty()) {
        result := result.concat([trimmed]);
      };
    };
    result;
  };

  func hasKeywordOverlap(a : Text, b : Text) : Bool {
    let wa = words(a);
    let wb = words(b);
    for (w in wa.values()) {
      for (v in wb.values()) {
        if (w == v and w.size() > 2) { return true };
      };
    };
    false;
  };

  public func findMatches(
    items : List.List<ItemTypes.Item>,
    targetItem : ItemTypes.Item,
  ) : [ItemTypes.Item] {
    // Opposite type, same category, keyword overlap in name or description
    let oppositeType : ItemTypes.ItemType = switch (targetItem.itemType) {
      case (#lost) #found;
      case (#found) #lost;
    };
    items.filter(func(item) {
      item.id != targetItem.id
      and item.itemType == oppositeType
      and item.category == targetItem.category
      and item.status == #open
      and (
        hasKeywordOverlap(item.name, targetItem.name)
        or hasKeywordOverlap(item.description, targetItem.description)
        or hasKeywordOverlap(item.name, targetItem.description)
        or hasKeywordOverlap(item.description, targetItem.name)
      )
    }).toArray();
  };
};
