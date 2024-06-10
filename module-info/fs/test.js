import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Примеры использования
const NEW_DIRECTORY = './module-info/fs/exampleDir';
const NEW_FILE = 'example.txt';
const CONTENT = 'Hello from fs-module (Node.js)\n';
const NEW_CONTENT = 'Testing writeFile/appendFile method\n';

// Создание директории
async function createDirectory(newDirectory) {
  try {
    await fs.mkdir(newDirectory, { recursive: true });
    console.log(`Directory created successfully at ${newDirectory}`);
  } catch (err) {
    console.error(`Error creating directory: ${err}`);
  }
}

// Создание файла
async function createFile(directory, filename, content = '') {
  try {
    if (!directory || !filename) {
      throw new Error('Directory and filename are required');
    }

    const filePath = path.join(directory, filename);
    await fs.writeFile(filePath, content, { encoding: 'utf-8' });
    console.log(`File created successfully at ${filePath}`);
  } catch (err) {
    console.error(`Error creating file: ${err}`);
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
    console.error(`Error reading directory: ${err}`);
  }
}

// Запись в файл
async function writeToFile(directory, filename, content, overwrite = true) {
  try {
    const filePath = path.join(directory, filename);

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
    console.error(`Error writing to file: ${err}`);
  }
}

// Чтение содержимого файла
async function readFileContent(directory, filename) {
  try {
    const filePath = path.join(directory, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    console.log(`File content of ${filePath}:\n`, data);
    return data;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

// Переименование файла
export async function renameFile(directory, oldFilename, newFilename) {
  try {
    const oldFilePath = path.join(directory, oldFilename);
    const newFilePath = path.join(directory, newFilename);

    await fs.rename(oldFilePath, newFilePath);
    console.log(`File renamed from ${oldFilename} to ${newFilename}`);
  } catch (err) {
    console.error(`Error renaming file: ${err}`);
  }
}

// Вызов функций только при прямом запуске файла
const currentFilePath = fileURLToPath(import.meta.url);
const normalizedFilePath = path.normalize(currentFilePath);
const expectedFilePath = path.resolve(process.cwd(), 'module-info/fs/test.js');

if (normalizedFilePath === expectedFilePath) {
  (async () => {
    await createDirectory(NEW_DIRECTORY);
    await createFile(NEW_DIRECTORY, NEW_FILE, CONTENT);
    await readDirectory(NEW_DIRECTORY);
    await writeToFile(NEW_DIRECTORY, NEW_FILE, NEW_CONTENT, false);
    await readFileContent(NEW_DIRECTORY, NEW_FILE);
  })();
}
