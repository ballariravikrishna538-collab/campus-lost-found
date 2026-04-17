import List "mo:core/List";
import Principal "mo:core/Principal";
import UserTypes "../types/users";
import Common "../types/common";
import UsersLib "../lib/users";

mixin (users : List.List<UserTypes.User>) {
  public shared ({ caller }) func registerUser(name : Text, email : Text) : async UserTypes.UserProfile {
    UsersLib.registerUser(users, caller, name, email);
  };

  public query ({ caller }) func getMyProfile() : async ?UserTypes.UserProfile {
    UsersLib.getUser(users, caller);
  };

  public query func getUserProfile(userId : Common.UserId) : async ?UserTypes.UserProfile {
    UsersLib.getUser(users, userId);
  };

  public shared ({ caller }) func updateMyProfile(request : UserTypes.UpdateUserRequest) : async ?UserTypes.UserProfile {
    UsersLib.updateUser(users, caller, request);
  };
};
