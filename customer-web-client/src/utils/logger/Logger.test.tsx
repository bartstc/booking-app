import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Logger } from './index';
import { LogLevel } from './Logger';

const ThrowableComponent = () => {
  return (
    <button
      onClick={() => {
        throw Error('Custom error.');
      }}
    >
      throw error
    </button>
  );
};

it('should throw error on create instance', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(() => new Logger()).toThrowError('Logger is not a constructor');
});

it('should throw error when call log function before initialization', () => {
  expect(() =>
    Logger.log({
      name: 'test-log',
      level: LogLevel.Error,
      message: 'test message',
      route: '/test/route',
    }),
  ).toThrowError('Logger not initialized');
});

it('should add additional info to every log', () => {
  const handler = jest.fn();
  Logger.init(handler);
  Logger.context.set('userId', '123');

  const { getByText } = render(<ThrowableComponent />);
  fireEvent.click(getByText('throw error'));

  expect(handler).toHaveBeenCalledWith(expect.objectContaining({ userId: '123' }));
});

it('should log error when callback throw error', () => {
  const destroy = Logger.init(() => {});
  const spyLog = jest.spyOn(Logger, 'log');

  const { getByText } = render(<ThrowableComponent />);

  fireEvent.click(getByText('throw error'));

  expect(spyLog).toHaveBeenCalled();
  destroy();
});
