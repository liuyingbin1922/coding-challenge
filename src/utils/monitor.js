/**
 * @description 实现前端监控：包含js error, 资源异常、接口异常； 
 * 支持缓存和批量上报；
 * 实现埋点上报
 */

export class Monitor {
    constructor() {
        this.cache = [];
        this.timer = null;
    }

    add(data) {
        this.cache.push(data);
    }

    sendLog() {
        const logs = this.cache;
        this.cache = [];
        console.log(logs);
    }

    sendResourceError(error) {
        this.add({ type: 'resourceError', error });
    }

    jsError(error) {
        this.add({ type: 'jsError', error });
    }
    sendError(error) {
        this.add({ type: 'error', error });
    }
}


export function getJSError () {
    window.addEventListener('error', (e) => {
        const monitor = new Monitor();
        monitor.jsError(e);
    })

    window.addEventListener('unhandledrejection', (e) => {
        const monitor = new Monitor();
        monitor.jsError(e);
    })        
}

export function getResourceError () {
    window.addEventListener('error', (e) => {
        const monitor = new Monitor();
        monitor.resourceError(e);
    })
}