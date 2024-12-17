const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const createToken = (user) => {
  const payload = {
    _id: user._id,
    name: user.name,
    role: user.role,
    isAnonymous: user.isAnonymous,
  };

  return jwt.sign(payload, JWT_SECRET, { algorithm: "HS256", expiresIn: "1d" });
};

const extractToken = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
  } catch (error) {
    console.error("Token verification error:", error.message);
    return null;
  }
};

module.exports = { createToken, extractToken, verifyToken };
