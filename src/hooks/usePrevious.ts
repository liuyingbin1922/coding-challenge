/**
 * @description 实现一个 usePrevious 钩子
 */

import { useRef, useEffect } from 'react';

export function usePrevious(value: any) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * @description ✅ 9. 实现异步任务重试机制 retry(fn, times, delay)
 */

export function retry(fn: Function, times: number, delay: number) {
  return new Promise((resolve, reject) => { 
    const doRetry = () => {
        fn().then(resolve).catch((err) => {
            if (times > 0) {
                times--;
                setTimeout(doRetry, delay);
            } else {
                reject(err);
            }
        })
    }
    doRetry();
  })
}


/**
 * @description ✅ 使用proxy 实现一个响应式数据系统（mini version）
 * const state = reactive({ count: 0 });
effect(() => console.log(state.count));
state.count++; // 自动触发 effect
 */

export function reactive(obj: any) {
  return new Proxy(obj, {
    get(target, key) {
      return target[key]; 
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    }
  })
}