const { hashPassword } = require("../utils/passwordHash");
const User = require("../models/User");

const users = [
  {
    name: "Admin Samurai",
    email: "admin@samurai.com",
    password: hashPassword("coffee123"),
    role: "admin",
    isAnonymous: false,
  },
];

// User.deleteMany({})
//   .then(() => {
//     console.log("Users collection is cleared");

//     return User.insertMany(users);
//   })
User.insertMany(users)
  .then(() => {
    console.log("Seeder data inserted successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("Seeder error:", err);
    process.exit(1);
  });
