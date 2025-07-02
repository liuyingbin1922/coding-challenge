/**
 * @description 实现react  18 的useEvent;
 */
import { useCallback, useRef, useEffect } from "react";

export function useEvent<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  });
  return useCallback((...args: Parameters<T>) => fnRef.current(...args), []);
}

// ✅ 题目4：deepClone 实现
export function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);

  let result;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj === 'function') return obj;
  if (Array.isArray(obj)) result = [];
  else result = {};

  map.set(obj, result);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], map);
    }
  }
  return result;
}


