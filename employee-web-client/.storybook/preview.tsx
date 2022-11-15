import { IntlProvider } from 'react-intl';
import { withReactQuery, withSuspense } from '../src/utils/storybook';
import { withRouter } from 'storybook-addon-react-router-v6';

const { theme } = require('../src/utils/theme');

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
  withRouter,
  withReactQuery(),
  withSuspense(),
];

if (typeof global.process === 'undefined') {
  const { worker } = require('../src/utils/mock/msw.browser');
  worker.start();
}
