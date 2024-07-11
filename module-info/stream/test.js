import fs from 'fs';
import chalk from 'chalk';
import { Transform } from 'stream';

/*
  Чтение файла происходит по частям (chunks), что позволяет обрабатывать каждую часть отдельно по мере поступления, не загружая весь файл в память сразу.
  Это особенно полезно при работе с большими файлами, так как снижает потребление памяти и может улучшить производительность.
  Событие 'data' срабатывает каждый раз, когда доступен новый кусок данных, а 'end' — когда все данные прочитаны.
*/

// Функция для чтения данных из файла
export function readStreamFromFile(filename, highWaterMark = 64 * 1024) {
  const readableStream = fs.createReadStream(filename, {
    encoding: 'utf8',
    highWaterMark: highWaterMark
  });

  readableStream.on('data', (chunk) => {
    console.log(chalk.bold.green(`Received ${chunk.length} bytes of data.`));
    console.log(chunk);
  });

  readableStream.on('end', () => {
    console.log('No more data.');
  });
}

// Функция для использования пайплайна для чтения и записи
export function usePipelineForReadWrite(inputFile, outputFile) {
  const readableStream = fs.createReadStream(inputFile, 'utf8');
  const writableStream = fs.createWriteStream(outputFile);

  readableStream.pipe(writableStream);
}

// Функция для создания и использования трансформирующего потока
export function useTransformStream() {
  class UpperCaseTransform extends Transform {
    _transform(chunk, encoding, callback) {
      this.push(chunk.toString().toUpperCase());
      callback();
    }
  }

  const upperCaseTransform = new UpperCaseTransform();

  console.log(chalk.green('Введите текст, который будет преобразован в верхний регистр.'));
  console.log(chalk.green('Для выхода из режима ввода текста, нажмите Ctrl+C.'));

  process.stdin
    .pipe(upperCaseTransform)
    .pipe(process.stdout)
}

// Расширенный пример с использованием нескольких методов модуля stream
export function compressAndWriteToFile(inputFile, outputFile) {
  const readableStream = fs.createReadStream(inputFile);
  const writableStream = fs.createWriteStream(outputFile);
  const compressStream = new Transform({
    transform(chunk, encoding, callback) {
      const compressedData = compress(chunk.toString()); // Функция сжатия данных
      this.push(compressedData);
      callback();
    }
  });

  readableStream.pipe(compressStream).pipe(writableStream);
}

function compress(data) {
  const dictionary = new Map();
  let currentCode = 256;
  let compressedData = Buffer.alloc(0); // Используем Buffer для работы с бинарными данными
  let phrase = '';

  for (let i = 0; i < data.length; i++) {
    const char = String.fromCharCode(data[i]); // Преобразуем каждый байт в символ
    const newPhrase = phrase + char;

    if (dictionary.has(newPhrase)) {
      phrase = newPhrase;
    } else {
      compressedData = Buffer.concat([compressedData, encodePhrase(dictionary, phrase)]);
      dictionary.set(newPhrase, currentCode++);
      phrase = char;
    }
  }

  compressedData = Buffer.concat([compressedData, encodePhrase(dictionary, phrase)]);

  return compressedData;
}

function encodePhrase(dictionary, phrase) {
  const code = dictionary.has(phrase) ? dictionary.get(phrase) : phrase.charCodeAt(0);
  return Buffer.from([code >> 8, code & 0xFF]); // Возвращаем код как двухбайтовое значение
}
