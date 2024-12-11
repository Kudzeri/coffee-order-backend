const User = require("../models/User");
const hashPassword = require("./passwordHash");
const generateRandomName = require("./randomName");

const createAnonymousUser = async () => {
  const name = generateRandomName();
  const day = 24 * 60 * 60 * 1000;
  const expirationTime = new Date(Date.now() + day);

  const anonymousUser = await User.create({
    name,
    isAnonymous: true,
    expirationTime,
  });

  return anonymousUser;
};

const createNewUser = async (email, password) => {
  const name = generateRandomName();
  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

module.exports = {
  createAnonymousUser,
  createNewUser,
};
