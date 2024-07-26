export default (baseUrl) => (req, res, next) => {
  const parsedUrl = new URL(req.url, baseUrl);
  const params = {};
  parsedUrl.searchParams.forEach((value, key) => params[key] = value);

  req.pathname = parsedUrl.pathname;
  req.params = params;
  next();
}
