import { useRef } from 'react';

/**
 * 简化版 useForm Hook
 * 用于注册字段、收集数据、触发验证
 */
export function useForm() {
  // 存储字段值
  const fieldsRef = useRef({} as Record<string, any>);
  // 存储验证规则
  const validatorsRef = useRef({} as Record<string, (value: any) => string | void>);

  // 注册字段
  function register(name: string, options?: { validate?: (value: any) => string | void }) {
    return {
      name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        fieldsRef.current[name] = e.target.value;
      },
      // 可选：初始值
      defaultValue: fieldsRef.current[name] || '',
      // 可选：自定义验证
      ...(options?.validate ? { validate: options.validate } : {})
    };
  }

  // 获取所有字段值
  function getValues() {
    return { ...fieldsRef.current };
  }

  // 触发所有字段的验证
  function validate() {
    const errors: Record<string, string> = {};
    for (const name in validatorsRef.current) {
      const value = fieldsRef.current[name];
      const validateFn = validatorsRef.current[name];
      if (validateFn) {
        const error = validateFn(value);
        if (error) errors[name] = error;
      }
    }
    return errors;
  }

  // 注册验证器
  function setValidator(name: string, validateFn: (value: any) => string | void) {
    validatorsRef.current[name] = validateFn;
  }

  return {
    register,
    getValues,
    validate,
    setValidator
  };
}