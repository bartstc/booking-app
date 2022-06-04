import { IntlProvider } from 'react-intl';
import { withReactQuery, withReactRouter, withSuspense } from '../src/utils/storybook';

const { theme } = require('../src/theme');

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme,
  },
};

// for MockService
localStorage.setItem('mock', 'true');

export const decorators = [
  story => (
    <IntlProvider locale='pl' onError={() => {}}>
      {story()}
    </IntlProvider>
  ),
  withReactRouter(),
  withReactQuery(),
  withSuspense(),
];

if (typeof global.process === 'undefined') {
  const { worker } = require('../src/msw.browser');
  worker.start();
}
