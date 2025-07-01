import React, { useRef, useState, useEffect, useCallback } from "react";

/**
 * 虚拟滚动列表组件
 * @param {Array} items - 渲染的数据项数组
 * @param {number} itemHeight - 每个 item 的高度（px）
 * @param {number} height - 容器高度（px）
 */
export default function VirtualList({ items, itemHeight, height }) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  // 可见区域最多能显示多少个 item（向上取整，多渲染 1-2 个防止白屏）
  const visibleCount = Math.ceil(height / itemHeight) + 2;
  const totalHeight = items.length * itemHeight;

  // 计算当前可见的起始和结束索引
  const startIdx = Math.max(0, Math.floor(scrollTop / itemHeight));
  const endIdx = Math.min(items.length, startIdx + visibleCount);
  const offsetY = startIdx * itemHeight;

  // 只渲染可见区域的 items
  const visibleItems = items.slice(startIdx, endIdx);

  // 滚动事件处理
  const onScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener("scroll", onScroll);
      return () => ref.removeEventListener("scroll", onScroll);
    }
  }, [onScroll]);

  return (
    <div
      ref={containerRef}
      style={{
        height,
        overflowY: "auto",
        position: "relative",
        width: "100%"
      }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{
          position: "absolute",
          top: offsetY,
          left: 0,
          right: 0,
          width: "100%"
        }}>
          {visibleItems.map((item, idx) => (
            <div
              key={startIdx + idx}
              style={{ height: itemHeight, boxSizing: "border-box", width: "100%" }}
            >
              {typeof item === "function" ? item() : item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}