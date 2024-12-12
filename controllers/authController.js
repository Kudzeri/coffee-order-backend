const { createAnonymousUser, createNewUser } = require("../utils/user");
const { createToken } = require("../utils/token");
const { sendError, sendServerError } = require("../utils/errorHandler");
const { comparePassword } = require("../utils/passwordHash");
const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
} = require("../validations/authValidation");

const registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: "Ошибка валидации",
      errors: error.details.map((detail) => detail.message),
    });
  }

  const { email, password, isAnonymous } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return sendError(res, 404, "Пользователь с таким email уже существует");
  }

  try {
    let user;

    if (isAnonymous) {
      user = await createAnonymousUser();
    } else {
      user = await createNewUser(email, password);
    }

    const token = createToken(user);
    user.password = undefined;

    return res.status(201).json({
      message: isAnonymous
        ? "Анонимный аккаунт создан"
        : "Пользователь зарегистрирован",
      user,
      token,
    });
  } catch (error) {
    return sendServerError(
      res,
      "Ошибка при регистрации пользователя:",
      error.message
    );
  }
};

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({
      message: "Ошибка валидации",
      errors: error.details.map((detail) => detail.message),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, 404, "Неверный email или пароль");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, 401, "Неверный email или пароль");
    }

    const token = createToken(user);
    user.password = undefined;

    return res.status(200).json({
      message: "Пользователь авторизован",
      user,
      token,
    });
  } catch (error) {
    return sendServerError(res, "Ошибка при авторизации пользователя:", error);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return sendError(res, 404, "Пользователь не найден");
    }
    user.password = undefined;
    return res.status(200).json({ user });
  } catch (error) {
    return sendServerError(res, "Ошибка при получении данных:", error);
  }
};

module.exports = { registerUser, loginUser, getMe };
