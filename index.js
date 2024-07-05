import chalk from 'chalk';
import { createEmptyBuffer, createBufferFromArray, createBufferFromString } from './module-info/buffer/create.js';
import { hashData, encryptData, decryptData, generateRSAKeyPair, signData, verifySignature } from './module-info/crypto/test.js';
import { createDirectory, createFile, readDirectory, writeToFile, readFileContent, openFile } from './module-info/fs/test.js';
import { getFullPath, getCurrentDirectory } from './module-info/path/test.js';
import { changeFileExtensions } from "./experiments/change-extensions.js";
import { config } from './env/config.js';

// Получение аргументов командной строки
const args = process.argv.slice(2);

// 1. Изучение встроенного модуля buffer
// Создание буферов
if (args.includes('createBuf')) {
  createEmptyBuffer();
  createBufferFromArray();
  createBufferFromString();
}

// 2. Изучение встроенного модуля crypto
const DATA = 'Изучение встроенного модуля crypto';
const ALGORITHM = 'sha256';
const ENCODING = 'hex';
const SECRET = config.secret;
const PASSPHRASE = config.passphrase;
const MODULUS_LENGTH = 4096;
const PUBLIC_EXPONENT = 0x10001

if (args.includes('crypto')) {
  const hashedData = hashData(DATA, ALGORITHM, ENCODING);
  console.log(chalk.bold('Хешированные данные: ') + chalk.italic.blue(`${hashedData}`));

  const encryptedData = encryptData(DATA, SECRET);
  console.log(chalk.bold('Зашифрованные данные: ') + chalk.italic.blue(`${encryptedData.encrypted}`));

  const decryptedData = decryptData(encryptedData.encrypted, SECRET, encryptedData.iv, encryptedData.salt);
  console.log(chalk.bold('Расшифрованные данные: ') + chalk.italic.blue(`${decryptedData}`));

  const { publicKey, privateKey } = generateRSAKeyPair(MODULUS_LENGTH, PUBLIC_EXPONENT, PASSPHRASE);
  console.log(chalk.bold('Публичный ключ: ') + chalk.italic.red(`${publicKey}`));
  console.log(chalk.bold('Приватный ключ: ') + chalk.italic.red(`${privateKey}`));

  const signature = signData(DATA, privateKey, PASSPHRASE);
  console.log(chalk.bold('Подпись: ') + chalk.italic.blue(`${signature}`));

  const isValid = verifySignature(DATA, publicKey, signature);
  console.log(chalk.bold('Подпись валидная: ') + chalk.italic.blue(`${isValid}`));
}

// 6. Изучение встроенного модуля fs
const NEW_DIRECTORY = './module-info/fs/exampleDir';
const NEW_FILE = 'example.txt';
const CONTENT = 'Hello from fs-module (Node.js)\n';
const NEW_CONTENT = 'Testing writeFile/appendFile method\n';

if (args.includes('fs')) {
  await createDirectory(NEW_DIRECTORY);
  await createFile(NEW_DIRECTORY, NEW_FILE, CONTENT);
  await readDirectory(NEW_DIRECTORY);
  await writeToFile(NEW_DIRECTORY, NEW_FILE, NEW_CONTENT, false);
  await readFileContent(NEW_DIRECTORY, NEW_FILE);
}

if (args.includes('fsOpen')) {
  await openFile(`${NEW_DIRECTORY}/${NEW_FILE}`);
}

// 10. Изучение встроенного модуля path
if (args.includes('path')) {
  const currentDirectory = getCurrentDirectory();
  const fullPath = getFullPath(currentDirectory, 'experiments/excel-sheets.js');
  console.log(chalk.bold('Полный путь до указанного файла: ') + chalk.italic.yellow(`${fullPath}`));
}

// Замена расширения файлов в указанной директории
const TARGET_DIRECTORY = './env';
const NEW_EXTENSION = '.ts';

if (args.includes('changeExt')) {
  await changeFileExtensions(TARGET_DIRECTORY, NEW_EXTENSION);
}
