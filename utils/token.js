const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const createToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    isAnonymous: user.isAnonymous,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

const extractToken = (req) => {
  const authHeader = reg.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
};

module.exports = { createToken, extractToken };
