import http from 'http';

// Создание и запуск HTTP сервера с обработкой различных маршрутов
export function createRouteHandlingServer(port, hostname) {
  const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Welcome to the homepage!\n');
    } else if (req.url === '/about' && req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('About us page\n');
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Page not found\n');
    }
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  return server;
}

// Создание HTTP-клиента
export function createHttpClient(options, callback) {
  const requestOptions = {
    hostname: options.hostname,
    port: options.port,
    path: options.path || '/',
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': options.body ? Buffer.byteLength(options.body) : 0
    }
  };

  const req = http.request(requestOptions, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (callback) {
        callback(null, data); // null указывает на отсутствие ошибок
      }
    });
  });

  req.on('error', (err) => {
    if (callback) {
      callback(err, null); // null указывает на отсутствие успешно полученных данных
    }
  });

  if (options.body) {
    req.write(options.body);
  }

  req.end();
}
