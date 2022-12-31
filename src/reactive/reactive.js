import { isObject } from '../utils';
import { track, trigger } from './effect';

const proxyMap = new WeakMap();

export const reactive = (target) => {
  // target must be object
  if (!isObject(target)) return target;
  // reactive(reactive(obj))
  if (isReactive(target)) return target;
  if (proxyMap.has(target)) return proxyMap.get(target);

  // proxy intercepts
  const proxy = new Proxy(target, {
    get: (target, key, receiver) => {
      if (key === '__isReactive') return true;
      const res = Reflect.get(target, key, receiver);
      track(target, key);
      return res;
    },
    set: (target, key, value, receiver) => {
      const res = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return res;
    },
  });

  proxyMap.set(target, proxy);
  return proxy;
};

export const isReactive = (target) => {
  return target.__isReactive;
};
