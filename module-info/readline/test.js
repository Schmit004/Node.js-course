import readline from 'readline';
import fs from 'fs';

// Функция для обработки стандартного ввода
export function handleStandardInput() {
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (data) => {
    const input = data.trim();

    if (input.toLowerCase() === 'exit') {
      console.log('\x1b[41m%s\x1b[0m', 'Exiting...');
      process.exit();
    }
    const userText = `\x1b[32m${input}\x1b[0m`;
    process.stdout.write(`You entered: ${userText}\n`);
  });

  console.log('\x1b[1m\x1b[32m\x1b[44m%s\x1b[0m', 'Please enter some text (type "exit" to quit):');
  /*
    \x1b[1m - жирный (bold) текст,
    \x1b[32m - зеленый цвет текста (не во всех консолях работает)
    \x1b[44m - синий цвет фона
    \x1b[0m - сброс всех стилей (последующий текст будет стандартного вида)
  */
}

// Функция для обработки стандартного ввода с помощью readline
export function handleLineInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Enter lines of text (type "exit" to quit):');

  rl.on('line', (input) => {
    if (input.trim() === 'exit') {
      rl.close();
    } else {
      console.log(`Received: ${input}`);
    }
  });

  rl.on('close', () => {
    console.log('Goodbye!');
  });
}

// Функция для запроса имени пользователя
export function askUserName() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('What is your name? ', (answer) => {
    console.log(`Hello, ${answer}!`);
    rl.close();
  });
}

// Функция для чтения данных из файла построчно
export function readFileLineByLine(filename) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filename),
    output: process.stdout,
    terminal: false
  });

  rl.on('line', (line) => {
    console.log(`Line from file: ${line}`);
  });
}
