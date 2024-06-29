import fs from 'fs';

// Буферы используются для чтения и записи бинарных данных в файлы.
// Чтение файла в буфер
fs.readFile('./libs/buffer-lib/text.txt', (err, data) => {
  if (err) throw err;
  // data - это буфер, который содержит бинарные данные файла
  console.log('data from txt file - ', data.toString('utf-8'));
});

// Запись буфера в файл
const buf = Buffer.from('No hello and no world', 'utf8');
fs.writeFile('./libs/buffer-lib/text.txt', buf, (err) => {
  if (err) throw err;
  console.log('File saved!');
});
