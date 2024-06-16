import { getFullPath, changeExtension } from '../module-info/path/test.js';
import { readDirectory, renameFile } from '../module-info/fs/test.js';

// Замена расширения у файлов в заданной директории
export async function changeFileExtensions(dir, newExt) {
  try {
    const entries = await readDirectory(dir);

    for (let entry of entries) {
      const oldFileName = entry.name;
      const fullPath = getFullPath(dir, oldFileName);

      if (entry.isDirectory) {
        // Рекурсивно обрабатываем поддиректорию
        await changeFileExtensions(fullPath, newExt);
      } else if (entry.isFile) {
        const newFileName = changeExtension(oldFileName, newExt);

        if (newFileName !== oldFileName) {
          const newFullPath = getFullPath(dir, newFileName);
          await renameFile(fullPath, newFullPath);
        }
      }
    }
  } catch (err) {
    console.error(`Error processing directory ${dir}:\n${err}`);
  }
}
