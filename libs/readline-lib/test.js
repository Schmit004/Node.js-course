import readline from 'readline';

// Пример использования stdin и stdout

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
  \x1b[1m - жирный (bold) текст
  \x1b[32m - зеленый цвет текста (не во всех консолях работает)
  \x1b[44m - синий цвет фона
  \x1b[0m - сброс всех стилей (последующий текст будет стандартного вида)
*/

// Пример использования встроенной библиотеки readline

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', (answer) => {
  console.log(`Hello, ${answer}!`);
  rl.close();
});
