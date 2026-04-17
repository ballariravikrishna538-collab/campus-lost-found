import Common "common";

module {
  public type ItemType = { #lost; #found };

  public type ItemStatus = { #open; #matched; #resolved };

  public type Category = {
    #electronics;
    #clothing;
    #documents;
    #accessories;
    #keys;
    #books;
    #other;
  };

  public type Item = {
    id : Common.ItemId;
    userId : Common.UserId;
    itemType : ItemType;
    name : Text;
    category : Category;
    description : Text;
    date : Common.Timestamp;
    location : Text;
    imageUrl : ?Text;
    status : ItemStatus;
    createdAt : Common.Timestamp;
  };

  public type CreateItemRequest = {
    itemType : ItemType;
    name : Text;
    category : Category;
    description : Text;
    date : Common.Timestamp;
    location : Text;
    imageUrl : ?Text;
  };

  public type UpdateItemRequest = {
    id : Common.ItemId;
    name : ?Text;
    description : ?Text;
    location : ?Text;
    imageUrl : ?Text;
  };

  public type ItemsPage = {
    items : [Item];
    total : Nat;
    offset : Nat;
    limit : Nat;
  };
};
