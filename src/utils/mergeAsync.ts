/**
 * @description 同一个参数复用请求， 不同参数正常进行请求;
 * @param fn 
 * @param args 
 */
export function mergeAsync(fn: (...args: any[]) => Promise<any>, ...args: any[]) {

    // 使用cache 缓存结果;
    const cache = new Map();

    return function (...args: any[]) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    }
}