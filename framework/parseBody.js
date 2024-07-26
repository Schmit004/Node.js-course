export default (req, res, next) => {
  let body = "";

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    if (body && req.headers['content-type'] === 'application/json') {
      try {
        req.body = JSON.parse(body);
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    }
    next();
  });
};
