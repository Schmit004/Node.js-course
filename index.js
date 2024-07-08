import chalk from 'chalk';
import { createEmptyBuffer, createBufferFromArray, createBufferFromString } from './module-info/buffer/create.js';
import { hashData, encryptData, decryptData, generateRSAKeyPair, signData, verifySignature } from './module-info/crypto/test.js';
import { createUDPClient, createUDPServer } from './module-info/dgram/test.js';
import { resolveDomain1, resolveDomain2, resolveMxRecords, resolveTxtRecords, resolveWithCustomServers, reverseLookup } from './module-info/dns/test.js';
import { registerEventListener, triggerEvent, removeEventListener } from './module-info/events/test.js';
import { createDirectory, createFile, readDirectory, writeToFile, readFileContent, openFile } from './module-info/fs/test.js';
import { createRouteHandlingServer, createHttpClient } from './module-info/http/test.js';
import { getFullPath, getCurrentDirectory } from './module-info/path/test.js';
import { changeFileExtensions } from "./experiments/change-extensions.js";
import { config } from './env/config.js';

// Получение аргументов командной строки
const args = process.argv.slice(2);

if (!args.length) {
  console.log(chalk.bold('Передайте один из следующих аргументов для тестирования возможностей встроенных модулей:'));
  console.log(chalk.bgBlue.white(`
    - createBuf: тестирование возможностей модуля buffer;
    - crypto: тестирование возможностей модуля crypto;
    - dgram: тестирование возможностей модуля dgram;
    - dns: тестирование возможностей модуля dns;
    - events: тестирование возможностей модуля events;
    - fs | fsOpen: тестирование возможностей модуля fs;
    - fttp: тестирование возможностей модуля http;
    - path: тестирование возможностей модуля path.\n`
  ))
  console.log(chalk.bold('Например: node index.js events'));
}

// 1. Изучение встроенного модуля buffer
// Создание буферов
if (args.includes('createBuf')) {
  createEmptyBuffer();
  createBufferFromArray();
  createBufferFromString();
}

// 2. Изучение встроенного модуля crypto
if (args.includes('crypto')) {
  const DATA = 'Изучение встроенного модуля crypto';
  const ALGORITHM = 'sha256';
  const ENCODING = 'hex';
  const SECRET = config.secret;
  const PASSPHRASE = config.passphrase;
  const MODULUS_LENGTH = 4096;
  const PUBLIC_EXPONENT = 0x10001

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

// 3. Изучение встроенного модуля dgram
if (args.includes('dgram')) {
  const UDP_HOST = config.udpHost;
  const UDP_PORT = config.udpPort;
  const MESSAGE = Buffer.from('Hello, UDP server!');

  createUDPServer(UDP_PORT);
  createUDPClient(MESSAGE, UDP_PORT, UDP_HOST);
}

// 4. Изучение встроенного модуля dns
if (args.includes('dns')) {
  const DOMAIN = 'google.com';
  const IP = '8.8.8.8';
  const SERVERS = ['8.8.8.8', '8.8.4.4'];

  await resolveDomain1(DOMAIN);
  resolveDomain2(DOMAIN);
  reverseLookup(IP);
  resolveMxRecords(DOMAIN);
  resolveTxtRecords(DOMAIN);
  resolveWithCustomServers(DOMAIN, SERVERS);
}

// 3. Изучение встроенного модуля events
if (args.includes('events')) {
  const BASIC_EVENT = 'event';
  const DATA_EVENT = 'data';
  const MESSAGE = 'Hello from events module'

  // Функция-слушатель для события event
  function responseToEvent() {
    console.log(chalk.bold.green('An event occurred!'));
  }

  // Функция-слушатель для события data
  function responseToData(message) {
    if (!message) {
      console.error(chalk.bold.red('No message data provided'));
      return;
    }
    console.log(chalk.bold('Received message: ') + chalk.italic.yellow(`${message}`));
  }

  registerEventListener(BASIC_EVENT, responseToEvent);
  registerEventListener(BASIC_EVENT, responseToEvent); // проверка на дублирования
  registerEventListener(DATA_EVENT, responseToData);
  triggerEvent(BASIC_EVENT);
  triggerEvent(DATA_EVENT); // проверка на отсутствие данных
  triggerEvent(DATA_EVENT, MESSAGE);
  removeEventListener(BASIC_EVENT, responseToData); // проверка на незарегистрированного слушателя
  removeEventListener(BASIC_EVENT, responseToEvent);
}

// 6. Изучение встроенного модуля fs
if (args.includes('fs')) {
  const NEW_DIRECTORY = './module-info/fs/exampleDir';
  const NEW_FILE = 'example.txt';
  const CONTENT = 'Hello from fs-module (Node.js)\n';
  const NEW_CONTENT = 'Testing writeFile/appendFile method\n';

  await createDirectory(NEW_DIRECTORY);
  await createFile(NEW_DIRECTORY, NEW_FILE, CONTENT);
  await readDirectory(NEW_DIRECTORY);
  await writeToFile(NEW_DIRECTORY, NEW_FILE, NEW_CONTENT, false);
  await readFileContent(NEW_DIRECTORY, NEW_FILE);
}

if (args.includes('fsOpen')) {
  await openFile(`${NEW_DIRECTORY}/${NEW_FILE}`);
}

// 3. Изучение встроенного модуля http
if (args.includes('http')) {
  const HOST = config.host;
  const PORT = config.port;
  const OPTIONS = {
    hostname: HOST,
    port: PORT,
    path: '/about'
  };

  function handleResponse(error, data) {
    if (error) {
      console.error(chalk.bold.red(`Произошла ошибка при выполнении запроса: ${error.message}`));
    } else {
      console.log(chalk.bold('Полученные данные: ') + chalk.italic.blue(`${data}`));
      // Дополнительная логики обработки данных
    }
  }

  createRouteHandlingServer(PORT, HOST);
  createHttpClient(OPTIONS, handleResponse);
}

// 10. Изучение встроенного модуля path
if (args.includes('path')) {
  const currentDirectory = getCurrentDirectory();
  const fullPath = getFullPath(currentDirectory, 'experiments/excel-sheets.js');

  console.log(chalk.bold('Полный путь до указанного файла: ') + chalk.italic.yellow(`${fullPath}`));
}

// Замена расширения файлов в указанной директории
if (args.includes('changeExt')) {
  const TARGET_DIRECTORY = './env';
  const NEW_EXTENSION = '.ts';

  await changeFileExtensions(TARGET_DIRECTORY, NEW_EXTENSION);
}
