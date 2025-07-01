export function debouncePromise(fn, delay)  {
    let timer = null;
    return function (...args) {
        return new Promise((resolve, reject) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                try {
                    const result = fn.apply(this, args);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }, delay);
        })
    }
}