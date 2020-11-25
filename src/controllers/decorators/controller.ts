import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AppRouter } from '../../services';
import { Method } from './Method';
import { Metadata } from './Metadata';

function bodyValidators(keys: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request!');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property: ${key}`);
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string = '') {
  return function (target: Function) {
    const router = AppRouter.instance;

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const method: Method = Reflect.getMetadata(
        Metadata.method,
        target.prototype,
        key
      );
      const path = Reflect.getMetadata(Metadata.path, target.prototype, key);
      const middlewares =
        Reflect.getMetadata(Metadata.middleware, target.prototype, key) || [];
      const requiredBodyProps =
        Reflect.getMetadata(Metadata.validator, target.prototype, key) || [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
