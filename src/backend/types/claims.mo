import Common "common";

module {
  public type ClaimStatus = { #pending; #approved; #rejected };

  public type Claim = {
    id : Common.ClaimId;
    itemId : Common.ItemId;
    claimantId : Common.UserId;
    message : Text;
    status : ClaimStatus;
    createdAt : Common.Timestamp;
  };

  public type CreateClaimRequest = {
    itemId : Common.ItemId;
    message : Text;
  };
};
