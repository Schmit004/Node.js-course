// Подключение необходимых модулей
import os from 'os';
import chalk from 'chalk';

// Функция для вывода общей информации о системе
export function systemInfo() {
  console.log(chalk.bold('Operating System: ') + chalk.italic.yellow(os.type()));
  console.log(chalk.bold('Platform: ') + chalk.italic.yellow(os.platform()));
  console.log(chalk.bold('Architecture: ') + chalk.italic.yellow(os.arch()));
  console.log(chalk.bold('Release: ') + chalk.italic.yellow(os.release()));
  console.log(chalk.bold('Uptime: ') + chalk.italic.yellow(`${os.uptime()} seconds`));
  console.log(chalk.bold('User Info: ') + chalk.italic.yellow(JSON.stringify(os.userInfo())));
}

// Функция для вывода информации о сетевых интерфейсах
export function networkInfo() {
  const networkInterfaces = os.networkInterfaces();
  console.log(chalk.bold('Network Interfaces: ') + chalk.italic.blue(JSON.stringify(networkInterfaces)));
}

// Функция для вывода информации о памяти системы
export function memoryInfo() {
  console.log(chalk.bold('Total Memory: ') + chalk.italic.green(`${os.totalmem()} bytes`));
  console.log(chalk.bold('Free Memory: ') + chalk.italic.green(`${os.freemem()} bytes`));
}

// Функция для вывода информации о загрузке системы
export function loadInfo() {
  console.log(chalk.bold('Load Average: ') + chalk.italic.cyan(os.loadavg().join(', ')));
}

// Функция для вывода путей к системным директориям
export function directoryInfo() {
  console.log(chalk.bold('Home Directory: ') + chalk.italic.gray(os.homedir()));
  console.log(chalk.bold('Temporary Directory: ') + chalk.italic.gray(os.tmpdir()));
}
