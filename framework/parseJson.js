export default (_req, res, next) => {
  res.send = (data) => {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(data));
  };
  next();
}
