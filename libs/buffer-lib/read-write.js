// Чтение и запись данных
// Запись данных в буфер
const buf1 = Buffer.alloc(10);
buf1.write('Hello again', 'utf8');
console.log('written buf1 - ', buf1);

// Чтение и запись чисел
const buf2 = Buffer.alloc(4);
buf2.writeUInt32BE(1234567890, 0);
console.log('written buf2 - ', buf2.readUInt32BE(0));

// Чтение данных из буфера, с преобразование в строку с указанной кодировкой
console.log('buf1 (utf8) - ', buf1.toString('utf8'));     // в формате utf8
console.log('buf1 (hex) - ', buf1.toString('hex'));       // в формате hex
console.log('buf1 (base64) - ', buf1.toString('base64')); // в формате base64

// Чтение данных из буфера, с преобразование в JSON
const json = buf1.toJSON();
console.log('JSON from buffer - ', json);

// Чтение данных из буфера, с преобразование в JSON и последующей сериализацией
const jsonString = JSON.stringify(buf1);
console.log('jsonString - ', jsonString);
/*
  JSON.stringify(buf1) автоматически вызывает buf1.toJSON(), если он существует.
  Это часть протокола JSON в JavaScript: когда JSON.stringify() сталкивается с объектом,
  он проверяет, есть ли у этого объекта метод toJSON().
  Если такой метод существует, он вызывает его и использует возвращаемое значение для сериализации.
*/

// Десериализация строки JSON обратно в объект
const parsedJSON = JSON.parse(jsonString);
console.log('parsedJSON - ', parsedJSON);

// Восстановление буфера из объекта JSON
const restoredBuf = Buffer.from(parsedJSON.data);
console.log('restoredBuf - ', restoredBuf.toString('utf8'));
