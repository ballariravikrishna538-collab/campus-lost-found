import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import ItemTypes "../types/items";
import Common "../types/common";

module {
  public func createItem(
    items : List.List<ItemTypes.Item>,
    nextId : Nat,
    caller : Common.UserId,
    request : ItemTypes.CreateItemRequest,
  ) : ItemTypes.Item {
    let item : ItemTypes.Item = {
      id = nextId;
      userId = caller;
      itemType = request.itemType;
      name = request.name;
      category = request.category;
      description = request.description;
      date = request.date;
      location = request.location;
      imageUrl = request.imageUrl;
      status = #open;
      createdAt = Time.now();
    };
    items.add(item);
    item;
  };

  public func getItem(
    items : List.List<ItemTypes.Item>,
    id : Common.ItemId,
  ) : ?ItemTypes.Item {
    items.find(func(item) { item.id == id });
  };

  public func updateItem(
    items : List.List<ItemTypes.Item>,
    caller : Common.UserId,
    request : ItemTypes.UpdateItemRequest,
  ) : ?ItemTypes.Item {
    var updated : ?ItemTypes.Item = null;
    items.mapInPlace(func(item) {
      if (item.id == request.id and Principal.equal(item.userId, caller)) {
        let newItem : ItemTypes.Item = {
          item with
          name = switch (request.name) { case (?n) n; case null item.name };
          description = switch (request.description) { case (?d) d; case null item.description };
          location = switch (request.location) { case (?l) l; case null item.location };
          imageUrl = switch (request.imageUrl) { case (?u) ?u; case null item.imageUrl };
        };
        updated := ?newItem;
        newItem;
      } else {
        item;
      }
    });
    updated;
  };

  public func deleteItem(
    items : List.List<ItemTypes.Item>,
    caller : Common.UserId,
    id : Common.ItemId,
  ) : Bool {
    let sizeBefore = items.size();
    let filtered = items.filter(func(item) {
      not (item.id == id and Principal.equal(item.userId, caller))
    });
    items.clear();
    items.append(filtered);
    items.size() < sizeBefore;
  };

  func pageItems(
    all : List.List<ItemTypes.Item>,
    offset : Nat,
    limit : Nat,
  ) : ItemTypes.ItemsPage {
    let total = all.size();
    let arr = all.sliceToArray(offset.toInt(), (offset + limit).toInt());
    { items = arr; total; offset; limit };
  };

  public func listAllItems(
    items : List.List<ItemTypes.Item>,
    offset : Nat,
    limit : Nat,
  ) : ItemTypes.ItemsPage {
    pageItems(items, offset, limit);
  };

  public func listItemsByUser(
    items : List.List<ItemTypes.Item>,
    userId : Common.UserId,
  ) : [ItemTypes.Item] {
    items.filter(func(item) { Principal.equal(item.userId, userId) }).toArray();
  };

  public func listItemsByCategory(
    items : List.List<ItemTypes.Item>,
    category : ItemTypes.Category,
    offset : Nat,
    limit : Nat,
  ) : ItemTypes.ItemsPage {
    let filtered = items.filter(func(item) { item.category == category });
    pageItems(filtered, offset, limit);
  };

  public func listItemsByType(
    items : List.List<ItemTypes.Item>,
    itemType : ItemTypes.ItemType,
    offset : Nat,
    limit : Nat,
  ) : ItemTypes.ItemsPage {
    let filtered = items.filter(func(item) { item.itemType == itemType });
    pageItems(filtered, offset, limit);
  };

  public func resolveItem(
    items : List.List<ItemTypes.Item>,
    caller : Common.UserId,
    id : Common.ItemId,
  ) : Bool {
    var changed = false;
    items.mapInPlace(func(item) {
      if (item.id == id and Principal.equal(item.userId, caller) and item.status != #resolved) {
        changed := true;
        { item with status = #resolved };
      } else {
        item;
      }
    });
    changed;
  };

  public func markItemMatched(
    items : List.List<ItemTypes.Item>,
    id : Common.ItemId,
  ) : Bool {
    var changed = false;
    items.mapInPlace(func(item) {
      if (item.id == id and item.status == #open) {
        changed := true;
        { item with status = #matched };
      } else {
        item;
      }
    });
    changed;
  };
};
