import React, { useRef, useState, useEffect } from 'react';

/**
 * LazyImage 组件：仅在进入可视区域时加载图片，支持加载失败处理
 * @param {string} src 图片地址
 * @param {string} alt 图片描述
 * @param {object} rest 其他 img 属性
 */
export default function LazyImage({ src, alt, ...rest }) {
  const imgRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} style={{ display: 'inline-block', minHeight: 1, minWidth: 1 }}>
      {inView ? (
        error ? (
          <div style={{ color: 'red' }}>图片加载失败</div>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setError(true)}
            {...rest}
          />
        )
      ) : (
        <div style={{ minHeight: 1, minWidth: 1 }}>图片加载中...</div>
      )}
    </div>
  );
} 