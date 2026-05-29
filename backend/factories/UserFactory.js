class Customer {

  constructor(data) {

    this.role =
      "customer";

    this.name =
      data.name;

    this.email =
      data.email;

    this.phone =
      data.phone;
  }
}

class Admin {

  constructor(data) {

    this.role =
      "admin";

    this.name =
      data.name;

    this.email =
      data.email;

    this.phone =
      data.phone;

    this.permissions = [
      "manage_users",
      "manage_bookings",
      "manage_menus",
    ];
  }
}

class UserFactory {

  static createUser(
    role,
    data
  ) {

    switch (
      role.toLowerCase()
    ) {

      case "admin":

        return new Admin(
          data
        );

      case "customer":

        return new Customer(
          data
        );

      default:

        throw new Error(
          "Invalid user role"
        );
    }
  }
}

module.exports =
  UserFactory;
