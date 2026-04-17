import List "mo:core/List";
import Common "types/common";
import ItemTypes "types/items";
import ClaimTypes "types/claims";
import NotifTypes "types/notifications";
import UserTypes "types/users";
import ItemsApi "mixins/items-api";
import ClaimsApi "mixins/claims-api";
import NotificationsApi "mixins/notifications-api";
import UsersApi "mixins/users-api";

actor {
  let items = List.empty<ItemTypes.Item>();
  let nextItemId : Common.Counter = { var value = 0 };

  let claims = List.empty<ClaimTypes.Claim>();
  let nextClaimId : Common.Counter = { var value = 0 };

  let notifications = List.empty<NotifTypes.Notification>();
  let nextNotifId : Common.Counter = { var value = 0 };

  let users = List.empty<UserTypes.User>();

  include UsersApi(users);
  include ItemsApi(items, nextItemId, notifications, nextNotifId);
  include ClaimsApi(claims, nextClaimId, items, notifications, nextNotifId);
  include NotificationsApi(notifications);
};
