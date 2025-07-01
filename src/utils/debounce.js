
/**
 * 防抖函数 - 延迟执行函数，如果在延迟时间内再次调用则重新计时
 * @param {Function} fn - 需要防抖的函数
 * @param {number} delay - 延迟时间，单位毫秒
 * @returns {Function} - 返回防抖后的函数
 */
export function debounce(fn, delay) {
  let timer = null;
  
  return function(...args) {
    const context = this;
    
    // 如果已经设置了定时器，则清除之前的定时器
    if (timer) {
      clearTimeout(timer);
    }
    
    // 设置新的定时器
    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
}

/**
 * 节流函数 - 限制函数在一定时间内只能执行一次
 * @param {Function} fn - 需要节流的函数
 * @param {number} interval - 时间间隔，单位毫秒
 * @returns {Function} - 返回节流后的函数
 */
export function throttle(fn, interval) {
  let lastTime = 0;
  
  return function(...args) {
    const context = this;
    const now = Date.now();
    
    // 如果距离上次执行的时间大于等于指定间隔，则执行函数
    if (now - lastTime >= interval) {
      fn.apply(context, args);
      lastTime = now;
    }
  };
}

 
 export function  debounce (fn, time) {
  const timerid  = setTimeout(fn, time);
  
 }