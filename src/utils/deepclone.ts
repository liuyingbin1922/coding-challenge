export function deepClone(obj: any, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  if (typeof obj === 'function') return obj;
  
  if (Array.isArray(obj)) return obj.map(item => deepClone(item, map));
  const result = {};
  
  for (const key in obj) {
    result[key] = deepClone(obj[key], map);
  }
  
  return result;
}