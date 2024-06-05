// Создание дополнительного процесса с использованием Worker Threads
import { Worker, isMainThread, parentPort } from 'worker_threads';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);

if (isMainThread) {
  // Основной поток
  console.log('Main thread process ID - ', process.pid);

  // Создание нового рабочего потока
  const worker = new Worker(currentFilePath);

  worker.on('message', (message) => {
    console.log('Message from worker - ', message);
  });

  worker.on('exit', (code) => {
    console.log('Worker exited with code - ', code);
  });
} else {
  // Рабочий поток
  console.log('Worker thread process ID - ', process.pid);
  parentPort.postMessage('Hello from worker');
}
