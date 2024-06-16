import { promises as fs } from 'fs';
import { getFullPath } from '../path/test.js';
import chalk from 'chalk';

// Создание директории
export async function createDirectory(newDirectory) {
  try {
    await fs.mkdir(newDirectory, { recursive: true });
    console.log(`Directory created successfully at ${newDirectory}`);
  } catch (err) {
    console.error(`Error creating directory:\n${err}`);
  }
}

// Создание файла
export async function createFile(directory, filename, content = '') {
  try {
    if (!directory || !filename) {
      throw new Error('Directory and filename are required');
    }

    const filePath = getFullPath(directory, filename);
    await fs.writeFile(filePath, content, { encoding: 'utf-8' });
    console.log(`File created successfully at ${filePath}`);
  } catch (err) {
    console.error(`Error creating file:\n${err}`);
  }
}

// Чтение содержимого директории
export async function readDirectory(directory) {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });
    const result = files.map(file => ({
      name: file.name,
      isFile: file.isFile(),
      isDirectory: file.isDirectory(),
    }));
    console.log(`Contents of directory ${directory}:`, result);
    return result;
  } catch (err) {
    console.error(`Error reading directory:\n${err}`);
  }
}

// Запись в файл
export async function writeToFile(directory, filename, content, overwrite = true) {
  try {
    const filePath = getFullPath(directory, filename);

    if (overwrite) {
      // Перезаписываем содержимое файла
      await fs.writeFile(filePath, content, { encoding: 'utf-8' });
      console.log(`File ${filename} has been overwritten with new content.`);
    } else {
      // Добавляем новое содержимое к существующему
      await fs.appendFile(filePath, content, { encoding: 'utf-8' });
      console.log(`New content has been appended to file ${filename}.`);
    }
  } catch (err) {
    console.error(`Error writing to file:\n${err}`);
  }
}

// Чтение содержимого файла
export async function readFileContent(directory, filename) {
  try {
    const filePath = getFullPath(directory, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(chalk.bold('File content of ' + `${filePath}:\n`) + chalk.italic.blue(`${data}`));
    return data;
  } catch (err) {
    console.error(`Error reading file ${filePath}:\n${err}`);
    throw err;
  }
}

// Переименование файла
export async function renameFile(oldFilePath, newFilePath) {
  try {
    await fs.rename(oldFilePath, newFilePath);
    console.log(chalk.bold(`File renamed from ${oldFilePath} to ${newFilePath}`));
  } catch (err) {
    console.error(`Error renaming file:\n${err}`);
  }
}
