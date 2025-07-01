type ThrottleOptions = {
  leading?: boolean;
};

export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  options: ThrottleOptions = {}
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[];
  let result: any;
  let leadingCalled = false;

  function throttled(this: any, ...args: any[]) {
    lastArgs = args;
    if (!timer) {
      if (options.leading && !leadingCalled) {
        result = fn.apply(this, args);
        leadingCalled = true;
        timer = setTimeout(() => {
          timer = null;
          leadingCalled = false;
        }, wait);
      } else {
        timer = setTimeout(() => {
          result = fn.apply(this, lastArgs);
          timer = null;
        }, wait);
      }
    }
    return result;
  }

  throttled.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    leadingCalled = false;
  };

  return throttled as T & { cancel: () => void };
} 