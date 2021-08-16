import axios from "axios";

export function request(config) {
  let instance;
  let url = config.url;
  if (url.startsWith('/server')) {
    instance = axios.create({
      timeout: 5000
    });
  } else {
    instance = axios.create({
      baseURL: '/api',
      timeout: 5000
    });
  }
  return instance(config);
}
