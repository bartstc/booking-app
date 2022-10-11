/* eslint-disable @typescript-eslint/no-empty-function */
export const muteConsoleBeforeEach = () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(jest.resetAllMocks);
};
