const { hashPassword } = require("../utils/passwordHash");
const User = require("../models/User");

const users = [
  {
    name: "Admin Samurai",
    email: "admin@samurai.com",
    password: "coffee123", // Пока оставляем пароль, позже хешируем
    role: "admin",
    isAnonymous: false,
  },
];

const insertAdmin = async () => {
  try {
    for (let user of users) {
      user.password = await hashPassword(user.password);
    }

    await User.insertMany(users);
    console.log("Seeder data inserted successfully");
    process.exit();
  } catch (err) {
    console.error("Seeder error:", err);
    process.exit(1);
  }
};

module.exports = { insertAdmin };
