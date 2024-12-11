const sendError = (res, code, message) => {
  return res.status(code).json({ message });
};

const sendServerError = (res, message) => {
  console.log(message, error);
  return res.status(500).json({ message: "Ошибка сервера" });
};

module.exports = { sendError, sendServerError };
