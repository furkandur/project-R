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

db.users.insert([
  {
    username: "Cerosh",
    email: "sceren@gmail.com",
    password: "cs123",
  },
  {
    username: "Furkito",
    email: "fdursun@gmail.com",
    password: "fd123",
  },
]);
