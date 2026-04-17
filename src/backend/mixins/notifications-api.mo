import List "mo:core/List";
import NotifTypes "../types/notifications";
import Common "../types/common";
import NotifLib "../lib/notifications";

mixin (
  notifications : List.List<NotifTypes.Notification>,
) {
  public query ({ caller }) func getMyNotifications() : async [NotifTypes.Notification] {
    NotifLib.listNotificationsByUser(notifications, caller);
  };

  public shared ({ caller }) func markNotificationRead(id : Common.NotificationId) : async Bool {
    NotifLib.markAsRead(notifications, caller, id);
  };
};
