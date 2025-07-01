import React, { ComponentType, useState, useEffect } from 'react';

/**
 * withAsyncComponent 高阶组件
 * @param loadComponent 组件加载函数，返回 Promise<ComponentType<any>>
 * @param options.loading 加载时的 fallback
 * @param options.error 加载失败时的 fallback
 */
export function withAsyncComponent<P = any>(
  loadComponent: () => Promise<{ default: ComponentType<P> }>,
  options?: {
    loading?: React.ReactNode;
    error?: React.ReactNode;
  }
): React.FC<P> {
  return function AsyncComponentWrapper(props: P) {
    const [Component, setComponent] = useState<ComponentType<P> | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      let mounted = true;
      loadComponent()
        .then(mod => {
          if (mounted) setComponent(() => mod.default);
        })
        .catch(err => {
          if (mounted) setError(err);
        });
      return () => {
        mounted = false;
      };
    }, []);

    if (error) {
      return <>{options?.error || <div>加载失败</div>}</>;
    }
    if (!Component) {
      return <>{options?.loading || <div>加载中...</div>}</>;
    }
    return <Component {...props} />;
  };
} 