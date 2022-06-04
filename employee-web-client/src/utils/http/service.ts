import { HttpService } from './HttpService';

const headers = {
  'Content-Type': 'application/json',
};

const gatewayHost = process.env.REACT_APP_API_HOST;
export const managementHost = `${gatewayHost}/${process.env.REACT_APP_MANAGEMENT_PREFIX}`;
export const accessibilityHost = `${gatewayHost}/${process.env.REACT_APP_ACCESSIBILITY_PREFIX}`;
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;

export const managementHttpService = new HttpService({
  host: managementHost,
  headers,
});

export const accessibilityHttpService = new HttpService({
  host: accessibilityHost,
  headers,
});

export const authHttpService = new HttpService({ host: `${auth0Domain}` });
