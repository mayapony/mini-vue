// target and key map a activeEffect(a function)
let activeEffect;

export const effect = (fn) => {
  //
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      return fn();
    } finally {
      // TODO effect try-catch finally...
    }
  };

  return effectFn();
};

/**
 * weakmap only allow object as it's key
 * targetMap = object(reactive object) -> key -> [activeEffectFn()]
 * reactive object and key (object.key) may correspond to multiple function
 */
const targetMap = new WeakMap();
export const track = (target, key) => {
  if (!target || !key) {
    console.error('you lost target or key in track!');
    return;
  }
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  let deps = depsMap.get(key);
  if (!deps) depsMap.set(key, (deps = new Set()));
  deps.add(activeEffect);
};

export const trigger = (target, key) => {
  if (!target || !key) {
    console.error('you lost target or key in trigger!');
    return;
  }
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  if (!deps) return;

  deps.forEach((fn) => {
    fn();
  });
};
