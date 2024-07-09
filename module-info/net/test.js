import net from 'net';

// Функция для создания TCP сервера
export function createTCPServer() {
  const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
      console.log(`Received: ${data}`);
      socket.write('Hello from server');
    });

    socket.on('end', () => {
      console.log('Client disconnected');
    });

    socket.on('error', (err) => {
      console.error(`Socket error: ${err}`);
    });
  });

  server.listen(8080, () => {
    console.log('Server listening on port 8080');
  });

  return server;
}

// Функция для создания TCP клиента
export function createTCPClient() {
  const client = net.createConnection({ port: 8080 }, () => {
    console.log('Connected to server');
    client.write('Hello from client');
  });

  client.on('data', (data) => {
    console.log(`Received: ${data}`);
    client.end();
  });

  client.on('end', () => {
    console.log('Disconnected from server');
  });

  client.on('error', (err) => {
    console.error(`Client error: ${err}`);
  });

  return client;
}
