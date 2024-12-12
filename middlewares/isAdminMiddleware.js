const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Доступ запрещен. Требуется роль администратора." });
  }
};

module.exports = isAdmin;
