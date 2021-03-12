import { HttpService } from './HttpService';

const headers = {
  'Content-Type': 'application/json',
};

const host = process.env.REACT_APP_API_HOST;
const managementServicePrefix = process.env.REACT_APP_MANAGEMENT_PREFIX;
const availabilityServicePrefix = process.env.REACT_APP_AVAILABILITY_PREFIX;

export const managementHttpService = new HttpService({
  host: `${host}/${managementServicePrefix}`,
  headers,
});

export const availabilityHttpService = new HttpService({
  host: `${host}/${availabilityServicePrefix}`,
  headers,
});
