const names = [
  "Зайка",
  "Красавчик",
  "Буйвол",
  "Медведь",
  "Лев",
  "Котик",
  "Петух",
  "Лисица",
  "Ежик",
  "Тигр",
  "Барсук",
  "Попугай",
  "Жираф",
  "Слон",
  "Панда",
  "Томагавк",
  "Рыжик",
  "Шершень",
  "Гроза",
  "Викинг",
  "Молния",
];

const generateRandomName = () => {
  const randomNickname = names[Math.floor(Math.random() * names.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${randomNickname}${randomNumber}`;
};

module.exports = generateRandomName;
