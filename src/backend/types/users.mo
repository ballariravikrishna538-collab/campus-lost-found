import Common "common";

module {
  public type User = {
    id : Common.UserId;
    var name : Text;
    var email : Text;
    createdAt : Common.Timestamp;
  };

  public type UserProfile = {
    id : Common.UserId;
    name : Text;
    email : Text;
    createdAt : Common.Timestamp;
  };

  public type UpdateUserRequest = {
    name : ?Text;
    email : ?Text;
  };
};
