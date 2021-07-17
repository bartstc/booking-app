import { HttpService } from './HttpService';

const headers = {
  'Content-Type': 'application/json',
};

const host = process.env.REACT_APP_API_HOST;
const managementServicePrefix = process.env.REACT_APP_MANAGEMENT_PREFIX;
const accessibilityServicePrefix = process.env.REACT_APP_ACCESSIBILITY_PREFIX;
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;

export const managementHttpService = new HttpService({
  host: `${host}/${managementServicePrefix}`,
  headers,
});

export const accessibilityHttpService = new HttpService({
  host: `${host}/${accessibilityServicePrefix}`,
  headers,
});

export const authHttpService = new HttpService({ host: `${auth0Domain}` });
