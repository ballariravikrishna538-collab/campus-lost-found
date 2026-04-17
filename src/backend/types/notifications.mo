import Common "common";

module {
  public type NotificationType = {
    #claim_received;
    #claim_approved;
    #claim_rejected;
    #match_found;
  };

  public type Notification = {
    id : Common.NotificationId;
    userId : Common.UserId;
    notificationType : NotificationType;
    message : Text;
    itemId : ?Common.ItemId;
    read : Bool;
    createdAt : Common.Timestamp;
  };
};
