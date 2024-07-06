import dgram from 'dgram';

// Функция для создания UDP-сервера
export function createUDPServer(port) {
  const server = dgram.createSocket('udp4');

  server.on('error', (err) => {
    console.log(`Server error:\n${err.stack}`);
    server.close();
  });

  server.on('message', (msg, rinfo) => {
    console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening ${address.address}:${address.port}`);
  });

  server.bind(port);
}

// Функция для создания UDP-клиента
export function createUDPClient(message, port, host) {
  const client = dgram.createSocket('udp4');

  client.send(message, port, host, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Message sent successfully');
    }
    client.close();
  });
}
