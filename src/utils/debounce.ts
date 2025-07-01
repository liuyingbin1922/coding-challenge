type DebounceOptions = {
  leading?: boolean;
};

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
  options: DebounceOptions = {}
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[];
  let result: any;
  let leadingCalled = false;

  function debounced(this: any, ...args: any[]) {
    lastArgs = args;
    if (timer) clearTimeout(timer);
    if (options.leading && !leadingCalled) {
      result = fn.apply(this, args);
      leadingCalled = true;
    } else {
      timer = setTimeout(() => {
        if (!options.leading) {
          result = fn.apply(this, lastArgs);
        }
        leadingCalled = false;
        timer = null;
      }, wait);
    }
    return result;
  }

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    leadingCalled = false;
  };

  return debounced as T & { cancel: () => void };
} 