import crypto from 'crypto';

// Хеширование данных
export function hashData(data, algorithm = 'sha256', encoding) {
  // Проверка входных параметров
  if (!crypto.getHashes().includes(algorithm)) {
    throw new Error(`Неподдерживаемый алгоритм хеширования: ${algorithm}`);
  }

  try {
    return crypto
      .createHash(algorithm)
      .update(data)
      .digest(encoding); // если аргумент не передан, то возвращает буфер с данными в двоичном формате
  } catch (error) {
    console.error(`Ошибка при хешировании данных: ${error.message}`);
    throw error;
  }
}

// Функция для симметричного шифрования
export function encryptData(data, secret) {
  const algorithm = 'aes-256-cbc';
  const salt = crypto.randomBytes(16).toString('hex');
  const key = crypto.scryptSync(secret, salt, 32);
  const iv = crypto.randomBytes(16);

  // Создаем объект шифрования
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  // Шифруем данные
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Возвращаем зашифрованные данные и вектор инициализации
  return { encrypted, iv: iv.toString('hex'), salt };
}

// Функция для симметричного расшифрования
export function decryptData(encrypted, secret, iv, salt) {
  const algorithm = 'aes-256-cbc';
  const key = crypto.scryptSync(secret, salt, 32);
  const ivBuffer = Buffer.from(iv, 'hex');

  // Создаем объект расшифрования
  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);

  // Расшифровываем данные
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Создание ключей
export function generateRSAKeyPair(modulusLength = 4096, publicExponent = 0x10001, passphrase) {
  try {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength,
      publicExponent,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase
      }
    });
    return { publicKey, privateKey };
  } catch (error) {
    throw new Error(`Ошибка при генерации ключей: ${error.message}`);
  }
};

// Функция для подписи данных
export function signData(data, privateKey, passphrase) {
  // Создаем объект подписчика с использованием алгоритма SHA256
  const sign = crypto.createSign('SHA256');

  // Обновляем объект подписчика данными для подписи
  sign.update(data);
  sign.end();

  // Подписываем данные с использованием закрытого ключа и возвращаем подпись в формате hex
  const signature = sign.sign({ key: privateKey, passphrase }, 'hex');
  return signature;
}

// Функция для проверки подписи
export function verifySignature(data, publicKey, signature) {
  // Создаем объект для проверки подписи с использованием алгоритма SHA256
  const verify = crypto.createVerify('SHA256');

  // Обновляем объект для проверки подписи данными
  verify.update(data);
  verify.end();

  // Проверяем подпись с использованием открытого ключа и возвращаем результат проверки (true или false)
  const isValid = verify.verify(publicKey, signature, 'hex');
  return isValid;
}

// Генерация случайных чисел с помощью метода crypto.randomBytes
export function getRandomNumber(min, max) {
  // Получаем буфер случайных байтов с помощью crypto.randomBytes
  const bytes = crypto.randomBytes(4);
  // Преобразуем буфер в число в диапазоне от 0 до 2^32 - 1
  const randomNumber = bytes.readUInt32BE(0);
  // Масштабируем число до заданного диапазона
  const scaledNumber = (randomNumber / (Math.pow(2, 32) - 1)) * (max - min + 1);
  // Возвращаем случайное число в заданном диапазоне
  return Math.floor(scaledNumber) + min;
}
