import { Metadata } from './Metadata';

export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(Metadata.validator, keys, target, key);
  };
}
