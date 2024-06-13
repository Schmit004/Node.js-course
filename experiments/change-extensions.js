import { getFullPath, changeExtension } from '../module-info/path/test.js';
import { readDirectory, renameFile } from '../module-info/fs/test.js';

// Замена расширения у файлов в заданной директории
export async function changeFileExtensions(dir, newExt) {
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
