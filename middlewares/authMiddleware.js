const { extractToken, verifyToken } = require("../utils/token");
const { sendError } = require("../utils/errorHandler");

const authMiddleware = (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    console.log("token not found");
    return sendError(res, 401, "Вы не авторизованы ");
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    console.log("token not valid:", token);
    return sendError(res, 401, "Вы не авторизованы");
  }

  req.user = decoded;
  next();
};

module.exports = authMiddleware;
