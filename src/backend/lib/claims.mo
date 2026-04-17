import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import ClaimTypes "../types/claims";
import Common "../types/common";

module {
  public func createClaim(
    claims : List.List<ClaimTypes.Claim>,
    nextId : Nat,
    caller : Common.UserId,
    request : ClaimTypes.CreateClaimRequest,
  ) : ClaimTypes.Claim {
    let claim : ClaimTypes.Claim = {
      id = nextId;
      itemId = request.itemId;
      claimantId = caller;
      message = request.message;
      status = #pending;
      createdAt = Time.now();
    };
    claims.add(claim);
    claim;
  };

  public func getClaim(
    claims : List.List<ClaimTypes.Claim>,
    id : Common.ClaimId,
  ) : ?ClaimTypes.Claim {
    claims.find(func(c) { c.id == id });
  };

  public func listClaimsByItem(
    claims : List.List<ClaimTypes.Claim>,
    itemId : Common.ItemId,
  ) : [ClaimTypes.Claim] {
    claims.filter(func(c) { c.itemId == itemId }).toArray();
  };

  public func listClaimsByUser(
    claims : List.List<ClaimTypes.Claim>,
    userId : Common.UserId,
  ) : [ClaimTypes.Claim] {
    claims.filter(func(c) { Principal.equal(c.claimantId, userId) }).toArray();
  };

  public func approveClaim(
    claims : List.List<ClaimTypes.Claim>,
    caller : Common.UserId,
    claimId : Common.ClaimId,
    ownerOfItem : Common.UserId,
  ) : Bool {
    if (not Principal.equal(caller, ownerOfItem)) { return false };
    var changed = false;
    claims.mapInPlace(func(c) {
      if (c.id == claimId and c.status == #pending) {
        changed := true;
        { c with status = #approved };
      } else {
        c;
      }
    });
    changed;
  };

  public func rejectClaim(
    claims : List.List<ClaimTypes.Claim>,
    caller : Common.UserId,
    claimId : Common.ClaimId,
    ownerOfItem : Common.UserId,
  ) : Bool {
    if (not Principal.equal(caller, ownerOfItem)) { return false };
    var changed = false;
    claims.mapInPlace(func(c) {
      if (c.id == claimId and c.status == #pending) {
        changed := true;
        { c with status = #rejected };
      } else {
        c;
      }
    });
    changed;
  };
};
