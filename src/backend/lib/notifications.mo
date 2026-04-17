import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import NotifTypes "../types/notifications";
import Common "../types/common";

module {
  public func createNotification(
    notifications : List.List<NotifTypes.Notification>,
    nextId : Nat,
    userId : Common.UserId,
    notifType : NotifTypes.NotificationType,
    message : Text,
    itemId : ?Common.ItemId,
  ) : NotifTypes.Notification {
    let notif : NotifTypes.Notification = {
      id = nextId;
      userId;
      notificationType = notifType;
      message;
      itemId;
      read = false;
      createdAt = Time.now();
    };
    notifications.add(notif);
    notif;
  };

  public func listNotificationsByUser(
    notifications : List.List<NotifTypes.Notification>,
    userId : Common.UserId,
  ) : [NotifTypes.Notification] {
    let userNotifs = notifications.filter(func(n) { Principal.equal(n.userId, userId) });
    // Sort by createdAt descending
    let sorted = userNotifs.sort(func(a, b) { Int.compare(b.createdAt, a.createdAt) });
    sorted.toArray();
  };

  public func markAsRead(
    notifications : List.List<NotifTypes.Notification>,
    caller : Common.UserId,
    id : Common.NotificationId,
  ) : Bool {
    var changed = false;
    notifications.mapInPlace(func(n) {
      if (n.id == id and Principal.equal(n.userId, caller) and not n.read) {
        changed := true;
        { n with read = true };
      } else {
        n;
      }
    });
    changed;
  };
};
