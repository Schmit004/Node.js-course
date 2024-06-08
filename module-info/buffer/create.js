// Создание буферов
// Создание пустого буфера с заданным размером (10 байт)
const buf1 = Buffer.alloc(10);
console.log('buf1 - ', buf1);

// Также можно создать буфер следующей командой const buf1 = new Buffer(10);
// Но подобный способ создание буфера считается устаревшим и не безопасным

// Создание буфера из массива байтов
const buf2 = Buffer.from([5, 4, 3, 4, 5]);
console.log('buf2 - ', buf2);

// Создание буфера из строки, в указанной кодировкой
const buf3 = Buffer.from('Hello, World!', 'utf8');
console.log('buf3 - ', buf3);

// Преобразование строки из переменной в буфер
const str = 'Hello, Node!';
const buf4 = Buffer.from(str, 'utf8');
console.log('buf4 - ', buf4);
