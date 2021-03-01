import { HttpService } from './HttpService';

const headers = {
  'Content-Type': 'application/json',
};

const host = process.env.REACT_APP_API_HOST;

const httpService = new HttpService({
  host,
  headers: headers,
});

export { httpService };
