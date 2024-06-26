import chalk from 'chalk';
import { createEmptyBuffer, createBufferFromArray, createBufferFromString } from './module-info/buffer/create.js';
import { changeFileExtensions } from "./experiments/change-extensions.js";

// Проверка на выполнение JS кода
const sum = 1 + 5;
console.log(chalk.bold('Вывод в консоль значения переменной sum: ') + chalk.italic.yellow(`${sum}`));

// Получение аргументов командной строки
const args = process.argv.slice(2);

// 1. Изучение встроенного модуля buffer
// Создание буферов
if (args.includes('createBuf')) {
  createEmptyBuffer();
  createBufferFromArray();
  createBufferFromString();
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

// Замена расширения файлов в указанной директории
const TARGET_DIRECTORY = './env';
const NEW_EXTENSION = '.ts';

if (args.includes('changeExt')) {
  await changeFileExtensions(TARGET_DIRECTORY, NEW_EXTENSION);
}
