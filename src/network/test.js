import {
  request
} from "./request.js";
export function test() {
  request({
    url: '/test',
    method: 'GET',
    params: {
      ccc: 'ddd',
    },
    headers: {
      aaa: 'bbb',
    }
  }).then(function (data) {
    console.log(data);
  });
};
