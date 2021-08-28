import axios from "axios";

export const status = 'dev';

export function request(config) {
  let instance;
  let url = config.url;
  if (url.startsWith('/server')) {
    if (status == 'build') {
      config.url = config.url.replace('/server', '/api');
    }
    instance = axios.create({
      timeout: 20000
    });
  } else {
    console.log(config.url);
    instance = axios.create({
      baseURL: '/api',
      timeout: 5000
    });
  }
  return instance(config);
}
