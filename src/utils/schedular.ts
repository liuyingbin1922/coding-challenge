/**
 * @description 并发调度器
 */

class Schedular {
    private step: number;
    // 支持并发;
    constructor(step: number) {
        this.step = step;
    }

    addTask(task: () => Promise<void>, delay: number) {
        const taskList: (() => Promise<void>)[] = [];
        for (let i = 0; i < this.step; i++) {
            taskList.push(() => task());
        }
        Promise.all(taskList).then(() => {
            setTimeout(() => {
                this.addTask(task, delay);  
            }, delay);
        });
    }
}

const schedular = new Schedular(3);
schedular.addTask(() => {
    console.log('task 1');
    return Promise.resolve();
}, 1000);