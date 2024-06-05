// Примеры использования объекта `process`
// Информация о процессе и окружении
console.log('Process ID - ', process.pid);
console.log('Parent Process ID - ', process.ppid);
console.log('Process Title - ', process.title);
console.log('Node Version - ', process.version);
console.log('Platform - ', process.platform);
console.log('Environment Variables - ', process.env);
console.log('Command Line Arguments - ', process.argv);

// Информация об использовании ресурсов
console.log('Memory Usage - ', process.memoryUsage());
console.log('Uptime (seconds) - ', process.uptime());

// Обработка событий процесса
// Обработка сигнала SIGINT (обычно отправляется при нажатии Ctrl+C)
process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
  process.exit(0);
});

// Обработка сигнала SIGTERM
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Exiting gracefully.');
  process.exit(0);
});

// Обработка необработанного отклонения промиса
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Завершение процесса после обработки отклонения
  process.exit(1);
});
Promise.reject(new Error('This is an unhandled rejection')); // для примера

// Обработка необработанных исключений
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception - ', err);
  // Завершение процесса после обработки исключения
  process.exit(1);
});
throw new Error('This is an uncaught exception'); // для примера

// Обработка события завершения процесса
process.on('exit', (code) => {
  console.log('Process exiting with code - ', code);
});
process.exit(0); // для примера
