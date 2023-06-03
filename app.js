const bcrypt = require('bcrypt');

// Функція має хешувати і виводити у консоль:
const createHashPassword = async password => {
  // Сіль (salt) -  це набір випадкових символів
  const salt = await bcrypt.genSalt(10);
  console.log('salt:', salt);
  // salt 1: $2b$10$YGPaWMDZIeuhsRC3fWDK/O
  // salt 2: $2b$10$mQH1YFUBNGHkqPFlPuTho.

  const result = await bcrypt.hash(password, 10); // перший арг - рядок, що тре захешувати, другий - кількість доданої солі (salt)
  // 10 - це не кількість символів, а складність алгоритму генерації. 10 зазвичай достатньо.

  console.log('result:', result);
  // result 1: $2b$10$uZNJ1Vyq8IZ..XIWmdy.4OqWBvmoMRlVA5uGgt3yqI6/frXDnEUbe
  // result 2: $2b$10$SrloFxA5vubS1c03WA/38u6ry27Aq8V1JdKB0nwNJMlB/eYh3oUHq

  // compare() дозволяє перевірити чи відповідає надісланий від фронтенду хеш рядку, що записаний у базі даних
  const compareResult1 = await bcrypt.compare(password, result); // true
  console.log('compareResult1:', compareResult1);
  const compareResult2 = await bcrypt.compare('123457', result); // false
  console.log('compareResult2:', compareResult2);
};

createHashPassword('123456');

// ? Як перший раз пароль попадає у базу? У вигляді хешу, чи як рядок?
