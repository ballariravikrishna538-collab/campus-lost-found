import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import UserTypes "../types/users";
import Common "../types/common";

module {
  public func toProfile(user : UserTypes.User) : UserTypes.UserProfile {
    { id = user.id; name = user.name; email = user.email; createdAt = user.createdAt };
  };

  public func registerUser(
    users : List.List<UserTypes.User>,
    caller : Common.UserId,
    name : Text,
    email : Text,
  ) : UserTypes.UserProfile {
    switch (users.find(func(u) { Principal.equal(u.id, caller) })) {
      case (?existing) {
        // Upsert: update name/email if re-registering
        existing.name := name;
        existing.email := email;
        toProfile(existing);
      };
      case null {
        let user : UserTypes.User = {
          id = caller;
          var name = name;
          var email = email;
          createdAt = Time.now();
        };
        users.add(user);
        toProfile(user);
      };
    };
  };

  public func getUser(
    users : List.List<UserTypes.User>,
    userId : Common.UserId,
  ) : ?UserTypes.UserProfile {
    switch (users.find(func(u) { Principal.equal(u.id, userId) })) {
      case (?u) ?toProfile(u);
      case null null;
    };
  };

  public func updateUser(
    users : List.List<UserTypes.User>,
    caller : Common.UserId,
    request : UserTypes.UpdateUserRequest,
  ) : ?UserTypes.UserProfile {
    switch (users.find(func(u) { Principal.equal(u.id, caller) })) {
      case (?u) {
        switch (request.name) { case (?n) { u.name := n }; case null {} };
        switch (request.email) { case (?e) { u.email := e }; case null {} };
        ?toProfile(u);
      };
      case null null;
    };
  };
};
