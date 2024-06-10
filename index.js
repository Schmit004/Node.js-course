import { getFullPath, changeExtension } from './module-info/path/test.js';
import { readDirectory, renameFile } from './module-info/fs/test.js';

// Простая проверка на выполнение JS кода
const sum = 1 + 5;
console.log(`Вывод в консоль значения переменной sum: ${sum}`);

// Замена расширения у файлов в заданной директории
async function changeFileExtensions(dir, newExt) {
  try {
    const entries = await readDirectory(dir);

    for (let entry of entries) {
      const fullPath = getFullPath(dir, entry.name);
      console.log('Полный путь - ', fullPath);

      if (entry.isDirectory()) {
        // Рекурсивно обрабатываем поддиректорию
        await changeFileExtensions(fullPath, newExt);
      } else if (entry.isFile()) {
        // Переименовываем файл
        const newFileName = changeExtension(entry.name, newExt);
        if (newFileName !== entry.name) {
          const newFullPath = getFullPath(dir, newFileName);
          await renameFile(fullPath, newFullPath);
          console.log(`Renamed: ${fullPath} -> ${newFullPath}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${dir}:`, err);
  }
}

// Пример использования
const targetDirectory = './module-info';
const newExtension = '.md';

changeFileExtensions(targetDirectory, newExtension)
  .then(() => console.log('All files processed'))
  .catch(err => console.error('Error:', err));
