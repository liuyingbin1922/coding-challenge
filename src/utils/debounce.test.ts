import { debounce } from './debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('should debounce calls', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);
    debounced();
    debounced();
    debounced();
    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledTimes(1);
  });

  it('should call immediately if leading is true', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100, { leading: true });
    debounced();
    expect(fn).toBeCalledTimes(1);
    debounced();
    debounced();
    expect(fn).toBeCalledTimes(1);
    jest.advanceTimersByTime(100);
    debounced();
    expect(fn).toBeCalledTimes(2);
  });

  it('should cancel pending calls', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);
    debounced();
    debounced.cancel();
    jest.advanceTimersByTime(100);
    expect(fn).not.toBeCalled();
  });

  it('should pass latest arguments', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);
    debounced('a');
    debounced('b');
    jest.advanceTimersByTime(100);
    expect(fn).toBeCalledWith('b');
  });
}); 