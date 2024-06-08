import net from 'net';

// Буферы используются для отправки и получения данных через сетевые сокеты.
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log('Received:', data); // data - это буфер
  });

  socket.write(Buffer.from('Hello, Client!', 'utf8'));
});

server.listen(8080, '127.0.0.1');
