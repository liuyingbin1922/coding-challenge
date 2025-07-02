好的，这里是为**蚂蚁集团高级前端岗位**精选的 **额外 10 道代码题**，每道都旨在考察真实业务开发中不可或缺的技术功底（异步控制、渲染优化、组件抽象、跨端设计、工程实践等）。

---

# 🔟 高级前端代码题（第二轮）

---

## ✅ 1. 实现一个节流函数 `throttle(fn, wait)`

> 要求支持立即执行一次 + 触发结束后执行最后一次

```js
const fn = () => console.log('trigger');
const throttled = throttle(fn, 1000);
```

**考点**：

* setTimeout 节流 vs requestAnimationFrame
* 执行时机控制、闭包变量管理

---

## ✅ 2. 实现一个 LRU 缓存类（带过期时间）

```js
const cache = new LRUCache(2);
cache.set('a', 1, 1000);
cache.set('b', 2);
cache.get('a'); // => 1
cache.set('c', 3);
cache.get('b'); // => null (被淘汰或过期)
```

**考点**：

* Map + 双向链表设计
* 过期判断
* cache eviction 策略

---

## ✅ 3. 实现一个支持异步校验的表单校验器

```js
const validator = createValidator({
  username: [
    v => !!v || '用户名不能为空',
    async v => await checkExist(v) || '用户名已存在'
  ],
});
```

**考点**：

* 多规则串行验证 + 支持 async
* 错误提示汇总逻辑
* Promise 控制与防抖

---

## ✅ 4. 实现一个 IntersectionObserver 的 polyfill 简版

```js
observe(el, callback); // 当 el 进入视口时触发 callback
```

**考点**：

* 滚动 + 节流监听
* 元素位置判断（boundingClientRect）
* 性能优化（批量处理、解绑）

---

## ✅ 5. 实现一个 CSP 安全脚本插入器

```js
insertScript({ src: 'https://cdn.com/a.js', nonce: 'xxx' });
```

**考点**：

* script DOM API 属性控制（async、defer、nonce）
* 加载状态监听（onload / onerror）
* CSP 原理理解

---

## ✅ 6. React 实现一个 useInterval Hook（支持 pause / resume）

```js
const [start, stop] = useInterval(() => {...}, 1000);
```

**考点**：

* useRef 保持 handler
* interval 生命周期绑定
* 停用、恢复机制抽象能力

---

## ✅ 7. 实现一个 HTML AST 转 JSX 字符串生成器

```js
const ast = {
  tag: 'div',
  attrs: { class: 'box' },
  children: [{ tag: 'p', children: ['hello'] }]
};
generateJSX(ast); // => <div class=\"box\"><p>hello</p></div>
```

**考点**：

* AST 遍历
* 字符串构造 + 防注入
* JSX 与 HTML 对比抽象

---

## ✅ 8. DOM 元素样式回溯（查找某元素所有 CSS 规则）

```js
getStylesForElement(el); // 输出所有有效的规则和优先级
```

**考点**：

* getComputedStyle
* 样式优先级解析（Specificity）
* CSSOM 和 StyleSheet API

---

## ✅ 9. 实现一个 iframe 通信通道（基于 postMessage）

```js
const bridge = createBridge(iframe.contentWindow);
bridge.send('ping', { x: 1 }).then(console.log);
```

**考点**：

* window\.postMessage / message 事件
* 请求响应匹配 + 防注入
* 超时控制 + 信道断连处理

---

## ✅ 10. 动态 CSS-in-JS 渲染引擎（模拟 styled-components）

```js
const StyledDiv = createStyled('div')`
  background: ${props => props.active ? 'red' : 'blue'};
`;
```

**考点**：

* 字符串模板处理
* style 标签插入与管理
* 运行时样式注入机制 + hash 计算

---
