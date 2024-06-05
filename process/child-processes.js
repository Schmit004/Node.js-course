import { fork } from 'child_process';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);

if (process.argv[2] === 'child') {
  console.log('Child process ID - ', process.pid);
  process.send('Hello from child process');
} else {
  console.log('Main process ID - ', process.pid);
  const child = fork(currentFilePath, ['child']);

  child.on('message', (message) => {
    console.log('Message from child - ', message);
  });

  child.on('exit', (code) => {
    console.log('Child process exited with code - ', code);
  });
}
