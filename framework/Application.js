import { createServer } from 'http';
import EventEmitter from 'events';

// enpoint = {
//   '/users': {
//      'GET': handler
//    }
// }

export default class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];
          handler(req, res);
        });
      });
    });
  }

  _createServer() {
    return createServer((req, res) => {
      let body = "";

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        req.body = body ? JSON.parse(body) : {};
        this._runMiddlewares(req, res, () => {
          const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);
          if (!emitted) {
            res.writeHead(404);
            res.end('Not Found');
          }
        });
      });
    });
  }

  _runMiddlewares(req, res, callback) {
    const runMiddleware = (index) => {
      if (index < this.middlewares.length) {
        this.middlewares[index](req, res, () => runMiddleware(index + 1));
      } else {
        callback();
      }
    };
    runMiddleware(0);
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}
