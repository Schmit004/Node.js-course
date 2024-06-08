// Манипуляция данными
// Копирование данных из buf1 в buf2
const buf1 = Buffer.from('Hello, World!', 'utf8');
const buf2 = Buffer.alloc(12);
buf1.copy(buf2, 0, 1, 11);
console.log('buf2 - ', buf2.toString('utf8'));

// Слияние буферов buf3 и buf4 в один буфер buf5
const buf3 = Buffer.from('Hello, ', 'utf8');
const buf4 = Buffer.from('World!', 'utf8');
const buf5 = Buffer.concat([buf3, buf4]);
console.log('buf5 - ', buf5.toString('utf8'));

// Разрезание буфера
const buf6 = Buffer.from('Hello, World!', 'utf8');
const buf7 = buf6.slice(0, 5);
console.log('buf7 - ', buf7.toString('utf8'));
// Метод slice() помечен как устаревший и лучше будет заменить его простым копированием.

// Заполнение буфера, для примера цифрой 3
const buf8 = Buffer.alloc(10);
buf8.fill(3);
console.log('buf8 - ', buf8);

// Сравнивает два буфера и возвращает true, если они идентичны
console.log('equals - ', buf1.equals(buf2));

// Сравнивает два буфера и возвращает число, указывающее, как они соотносятся.
const buf9 = Buffer.from('ABC');
const buf10 = Buffer.from('BCD');
console.log('compare - ', buf9.compare(buf10)); // -1 (buf9 меньше buf10)
