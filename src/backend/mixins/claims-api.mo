import List "mo:core/List";
import Principal "mo:core/Principal";
import ClaimTypes "../types/claims";
import ItemTypes "../types/items";
import NotifTypes "../types/notifications";
import Common "../types/common";
import ClaimsLib "../lib/claims";
import ItemsLib "../lib/items";
import NotifLib "../lib/notifications";

mixin (
  claims : List.List<ClaimTypes.Claim>,
  nextClaimId : Common.Counter,
  items : List.List<ItemTypes.Item>,
  notifications : List.List<NotifTypes.Notification>,
  nextNotifId : Common.Counter,
) {
  public shared ({ caller }) func submitClaim(request : ClaimTypes.CreateClaimRequest) : async ClaimTypes.Claim {
    let claim = ClaimsLib.createClaim(claims, nextClaimId.value, caller, request);
    nextClaimId.value += 1;
    // Notify the item owner that a claim was received
    switch (ItemsLib.getItem(items, request.itemId)) {
      case (?item) {
        let msg = "Someone has submitted a claim on your item: " # item.name;
        ignore NotifLib.createNotification(notifications, nextNotifId.value, item.userId, #claim_received, msg, ?item.id);
        nextNotifId.value += 1;
      };
      case null {};
    };
    claim;
  };

  public query func listClaimsByItem(itemId : Common.ItemId) : async [ClaimTypes.Claim] {
    ClaimsLib.listClaimsByItem(claims, itemId);
  };

  public query ({ caller }) func listMyClaims() : async [ClaimTypes.Claim] {
    ClaimsLib.listClaimsByUser(claims, caller);
  };

  public shared ({ caller }) func approveClaim(claimId : Common.ClaimId) : async Bool {
    switch (ClaimsLib.getClaim(claims, claimId)) {
      case (?claim) {
        switch (ItemsLib.getItem(items, claim.itemId)) {
          case (?item) {
            let result = ClaimsLib.approveClaim(claims, caller, claimId, item.userId);
            if (result) {
              // Mark item as resolved
              ignore ItemsLib.resolveItem(items, item.userId, item.id);
              // Notify claimant
              let msg = "Your claim on '" # item.name # "' has been approved.";
              ignore NotifLib.createNotification(notifications, nextNotifId.value, claim.claimantId, #claim_approved, msg, ?item.id);
              nextNotifId.value += 1;
            };
            result;
          };
          case null false;
        };
      };
      case null false;
    };
  };

  public shared ({ caller }) func rejectClaim(claimId : Common.ClaimId) : async Bool {
    switch (ClaimsLib.getClaim(claims, claimId)) {
      case (?claim) {
        switch (ItemsLib.getItem(items, claim.itemId)) {
          case (?item) {
            let result = ClaimsLib.rejectClaim(claims, caller, claimId, item.userId);
            if (result) {
              // Notify claimant
              let msg = "Your claim on '" # item.name # "' has been rejected.";
              ignore NotifLib.createNotification(notifications, nextNotifId.value, claim.claimantId, #claim_rejected, msg, ?item.id);
              nextNotifId.value += 1;
            };
            result;
          };
          case null false;
        };
      };
      case null false;
    };
  };
};
