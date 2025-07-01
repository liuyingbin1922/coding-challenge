import { throttle } from './throttle';

jest.useFakeTimers();

describe('throttle', () => {
  it('should throttle calls', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    expect(fn).toBeCalledTimes(0);
    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledTimes(1);
  });

  it('should call immediately if leading is true', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100, { leading: true });
    throttled();
    expect(fn).toBeCalledTimes(1);
    throttled();
    throttled();
    expect(fn).toBeCalledTimes(1);
    jest.advanceTimersByTime(100);
    throttled();
    expect(fn).toBeCalledTimes(2);
  });

  it('should cancel pending calls', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled.cancel();
    jest.advanceTimersByTime(100);
    expect(fn).not.toBeCalled();
  });

  it('should pass latest arguments', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled('a');
    throttled('b');
    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledWith('b');
  });
}); 