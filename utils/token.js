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

module.exports = createToken;
