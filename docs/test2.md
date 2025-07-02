
---

# 🧠 蚂蚁集团风格的高级前端代码题（精选）

## ✅ 题目1：异步任务调度器（经典高频）

> **描述**：实现一个带并发限制的异步任务调度器 `Scheduler`，并发数为 2，每次添加任务后自动执行，任务是返回 Promise 的函数。

```js
const scheduler = new Scheduler(2);

scheduler.add(() => timeout(1000, 'task1')).then(console.log);
scheduler.add(() => timeout(500, 'task2')).then(console.log);
scheduler.add(() => timeout(300, 'task3')).then(console.log);
scheduler.add(() => timeout(400, 'task4')).then(console.log);

// => 按顺序输出 task1、task2、task3、task4，执行时保持最大2个并发
```

**考点**：

* 异步控制（Promise）
* 并发队列调度（微任务/宏任务）
* 数据结构（队列、Set、Map）
* 封装与高内聚思维

---

## ✅ 题目2：虚拟滚动列表实现

> **描述**：实现一个简单的虚拟滚动容器 `VirtualList`，要求支持：

* 固定高度容器
* 大量 item（比如 1 万条）
* 滚动时只渲染可视区数据（支持动态滚动）

```jsx
<VirtualList
  height={500}
  itemHeight={50}
  itemCount={10000}
  renderItem={(index) => <div>Item {index}</div>}
/>
```

**考点**：

* DOM 性能优化
* 视口计算 + 节点复用
* React Hooks / useRef / useEffect 运用
* 滚动事件节流 / requestAnimationFrame

---

## ✅ 题目3：实现一个 React 的 useEvent Hook

> **描述**：模仿 React 18 内部 `useEvent`，实现一个在事件绑定中始终引用“最新函数”的 Hook，避免闭包陷阱。

```js
const handler = useEvent(() => {
  console.log(state); // 始终打印最新的 state
});
```

**考点**：

* useRef + useCallback 控制闭包
* 高阶 Hook 抽象能力
* 函数式组件更新机制理解

---

## ✅ 题目4：实现 deepClone 函数，支持以下功能

```js
const obj = {
  a: 1,
  b: { c: 2 },
  d: [3, 4],
  e: new Date(),
  f: /abc/,
  g: function() {},
};
const newObj = deepClone(obj);
```

**考点**：

* 深拷贝 + 循环引用处理
* 特殊类型处理（Date, RegExp, Function）
* WeakMap 防止死循环
* 工程封装思维

---

## ✅ 题目5：大文件分片上传模拟器（工程题）

> **描述**：实现一个 `Uploader` 类，模拟将大文件切成 chunk（每块 1MB），上传时支持：

* 并发上传最多 3 个
* 某个 chunk 上传失败自动重试（最多 2 次）

```js
const uploader = new Uploader(file); // file.size = 10MB
uploader.start(); // 打印每块上传进度
```

**考点**：

* Blob + FileReader
* 异步任务调度 + 限流
* 状态管理（chunk状态、重试机制）
* 实际工程项目常见场景题

---

## ✅ 题目6：前端 DSL 编译器

> **描述**：给定如下 DSL 模板，实现一个解析函数生成真实 DOM 树：

```js
const template = {
  tag: 'div',
  props: { class: 'container' },
  children: [
    { tag: 'h1', props: {}, children: ['标题'] },
    { tag: 'p', props: {}, children: ['内容'] }
  ]
};

compile(template); // 返回真实 DOM 节点
```

**考点**：

* 递归树处理
* DOM API 熟练度
* 抽象建模能力
* 与 JSX / AST 转换思维接近

---

## ✅ 题目7：实现一个高性能的 EventEmitter

> **描述**：实现一个可移除、可异步触发、支持 once 的事件总线 `EventEmitter` 类。

```js
const bus = new EventEmitter();
bus.on('foo', async () => {});
bus.once('bar', () => {});
bus.emit('foo');
```

**考点**：

* 事件模式设计
* Map / WeakMap 使用
* 内部任务调度与回调机制
* 面向对象封装能力

---

## 🔚 总结

这些题目均适合在蚂蚁集团中高面试中使用，既能覆盖**异步控制、前端架构、Hook抽象、性能优化**等核心领域，也能很好区分出具备**实际工程视野 + 技术理解深度**的高级前端候选人。

---

