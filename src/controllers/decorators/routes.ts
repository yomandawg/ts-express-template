import { RequestHandler } from 'express';
import { Method } from './Method';
import { Metadata } from './Metadata';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeFactory(method: Method) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(Metadata.method, method, target, key);
      Reflect.defineMetadata(Metadata.path, path, target, key);
    };
  };
}

export const get = routeFactory(Method.get);
export const post = routeFactory(Method.post);
export const patch = routeFactory(Method.patch);
export const put = routeFactory(Method.put);
export const del = routeFactory(Method.del);
