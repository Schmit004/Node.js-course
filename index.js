import { changeFileExtensions } from "./experiments/change-extensions";

// Проверка на выполнение JS кода
const sum = 1 + 5;
console.log(`Вывод в консоль значения переменной sum: ${sum}`);

// Получение аргументов командной строки
const args = process.argv.slice(2);

// Пример замены расширения файлов в указанной директории
const TARGET_DIRECTORY = './module-info';
const NEW_EXTENSION = '.ts';

if (args.includes('changeExt')) {
  await changeFileExtensions(TARGET_DIRECTORY, NEW_EXTENSION);
}
