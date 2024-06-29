import chalk from "chalk";

export function createEmptyBuffer(size = 10) { // По умолчанию создастся буфер на 10 байт
  const buf = Buffer.alloc(size);
  console.log(chalk.bold('Создание пустого буфера с заданным размером - '), chalk.italic.yellow(buf.toString('hex')));
  return buf;
}

export function createBufferFromArray(byteArray = [1, 2, 3]) {
  const buf = Buffer.from(byteArray);
  console.log(chalk.bold('Создание буфера из массива байтов - '), chalk.italic.yellow(buf.toString('hex')));
  return buf;
}

export function createBufferFromString(string = 'placeholder', encoding = 'utf8') {
  const buf = Buffer.from(string, encoding);
  console.log(chalk.bold('Создание буфера из строки, в указанной кодировкой - '), chalk.italic.yellow(buf.toString('hex')));
  return buf;
}

// Также можно создать буфер следующей командой const buf = new Buffer(10)
// Но подобный способ создание буфера считается устаревшим и не безопасным
