/**
 * @description 实现LRU缓存
 */
export class LRUCache {
    private capacity: number;
    private cache: Map<string, any>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: string) {
        const value = this.cache.get(key);
        if (value) {
            this.cache.delete(key);
            this.cache.set(key, value);
        }
        return value;
    }

    set(key: string, value: any) {
        if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    }

    delete(key: string) {
        this.cache.delete(key);
    }
}