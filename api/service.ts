/* eslint-disable no-console */
import axios from 'axios';
import { isDev } from '@/configs/environment';

const service = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/${process.env.NEXT_PUBLIC_API_VERSION}`,
  timeout: 100000,
});

const errorMap = {
  '404': '请求路径404',
  '401': '没有权限',
  '403': '没有权限',
  '500': '服务端错误',
};

type ErrorKey = keyof typeof errorMap;

service.interceptors.response.use(
  wrapRes => {
    const res = wrapRes.data;
    const { data, status } = res;
    if (isDev) {
      console.log('response data', data);
    }
    if (status !== 200) {
      throw new Error('请求错误');
    }
    return data;
  },
  (error: any) => {
    const { response } = error;
    if (response) {
      const { status } = response;

      console.error('request error:', errorMap[status as ErrorKey]);
    } else {
      console.error('itsuki error', error);
    }
  }
);

export default service;
