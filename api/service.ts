import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5555/v1',
  timeout: 100000,
});

service.interceptors.response.use(wrapRes => {
  const res = wrapRes.data;
  const { data, status } = res;
  // eslint-disable-next-line no-console
  console.log(data);
  if (status !== 200) {
    throw new Error('请求错误');
  }
  return data;
});

export default service;
