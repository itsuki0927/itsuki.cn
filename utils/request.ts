import axios, { AxiosResponse } from 'axios';
import { WrapperResponse } from '@/entities/response/base';

const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_PATH}/${process.env.NEXT_PUBLIC_API_VERSION}`;

const request = axios.create({
  baseURL,
  timeout: 200000,
});

request.interceptors.response.use((res: AxiosResponse<WrapperResponse>) => res.data);

export default request;
