import { WrapperResponse } from '@/entities/response/base';
import axios, { AxiosResponse } from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/${process.env.NEXT_PUBLIC_API_VERSION}`;

const request = axios.create({
  baseURL,
  timeout: 10000,
});

request.interceptors.response.use((res: AxiosResponse<WrapperResponse>) => {
  return res.data;
});

export default request;
