import List "mo:core/List";
import ItemTypes "../types/items";
import NotifTypes "../types/notifications";
import Common "../types/common";
import ItemsLib "../lib/items";
import MatchingLib "../lib/matching";
import NotifLib "../lib/notifications";

mixin (
  items : List.List<ItemTypes.Item>,
  nextItemId : Common.Counter,
  notifications : List.List<NotifTypes.Notification>,
  nextNotifId : Common.Counter,
) {
  public shared ({ caller }) func createItem(request : ItemTypes.CreateItemRequest) : async ItemTypes.Item {
    let item = ItemsLib.createItem(items, nextItemId.value, caller, request);
    nextItemId.value += 1;
    // Trigger match notifications for all found matches
    let matches = MatchingLib.findMatches(items, item);
    for (match in matches.values()) {
      let msg = "A possible match was found for your item: " # item.name;
      ignore NotifLib.createNotification(notifications, nextNotifId.value, match.userId, #match_found, msg, ?item.id);
      nextNotifId.value += 1;
      let msg2 = "A possible match was found for your item: " # match.name;
      ignore NotifLib.createNotification(notifications, nextNotifId.value, item.userId, #match_found, msg2, ?match.id);
      nextNotifId.value += 1;
    };
    item;
  };

  public query func getItem(id : Common.ItemId) : async ?ItemTypes.Item {
    ItemsLib.getItem(items, id);
  };

  public shared ({ caller }) func updateItem(request : ItemTypes.UpdateItemRequest) : async ?ItemTypes.Item {
    ItemsLib.updateItem(items, caller, request);
  };

  public shared ({ caller }) func deleteItem(id : Common.ItemId) : async Bool {
    ItemsLib.deleteItem(items, caller, id);
  };

  public query func listAllItems(offset : Nat, limit : Nat) : async ItemTypes.ItemsPage {
    ItemsLib.listAllItems(items, offset, limit);
  };

  public query func listItemsByUser(userId : Common.UserId) : async [ItemTypes.Item] {
    ItemsLib.listItemsByUser(items, userId);
  };

  public query func listItemsByCategory(category : ItemTypes.Category, offset : Nat, limit : Nat) : async ItemTypes.ItemsPage {
    ItemsLib.listItemsByCategory(items, category, offset, limit);
  };

  public query func listItemsByType(itemType : ItemTypes.ItemType, offset : Nat, limit : Nat) : async ItemTypes.ItemsPage {
    ItemsLib.listItemsByType(items, itemType, offset, limit);
  };

  public shared ({ caller }) func resolveItem(id : Common.ItemId) : async Bool {
    ItemsLib.resolveItem(items, caller, id);
  };

  public query func getMatchSuggestions(id : Common.ItemId) : async [ItemTypes.Item] {
    switch (ItemsLib.getItem(items, id)) {
      case (?item) MatchingLib.findMatches(items, item);
      case null [];
    };
  };
};
