db.createUser({
  user: "the_username",
  pwd: "the_password",
  roles: [
    {
      role: "dbOwner",
      db: "the_database",
    },
  ],
});

db.createCollection("users");
db.createCollection("locations");

db.users.insert([
  {
    username: "Cerosh",
    email: "sceren@gmail.com",
    password: "$2a$10$uR5e7NXUYJBe.0v5hRr7b.2fFr.gsJ6SjSwMKRNswLujgKXB0DHLK",
  },
  {
    username: "Furkito",
    email: "fdursun@gmail.com",
    password: "$2a$10$tqYiWkZZgKVqA0WLE8XLYuv6L.jpdcrbqxhaaMek6Hx/eSr2m2V1G",
  },
]);
