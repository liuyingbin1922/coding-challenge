/**
 * @description
 * ✅ 1. 实现 deepEqual 深度相等判断函数
js
复制
编辑
deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // true
 */

export function deepEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

/**
 * 
 * @description 实现 compose 函数管道工具
 */
export function compose(...fns: Function[]) {
  return function (...args: any[]) {
    return fns.reduce((prev, curr) => curr(prev), args);
  }
}

/**
 * @description 实现一个 JSON schema 校验器
 * validate({ name: 'a', age: 18 }, {
  name: 'string',
  age: 'number'
});
 */

export function validateJsonSchema(schema: any, data: any) {
    
}

/**
 * @description 实现可取消的 fetchWithCancel
 * const { promise, cancel } = fetchWithCancel('/api');
cancel(); // 请求中断
 */

export function fetchWithCancel(url: string) {
    let controller = new AbortController();
    let signal = controller.signal;
    let promise = fetch(url, { signal });
    // promise.then(() => {
    //     controller.abort();
    // });
    return {
        promise,
        cancel: () => {
            controller.abort();
        }
    };
}