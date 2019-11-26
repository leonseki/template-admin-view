import axios from 'axios';
import router from '../router';
import apiUrl from '../config/api_url';

import { NO_LOGIN_CODE ,NORMAL_REQUEST_TIMEOUT } from '../../constant'


const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: NORMAL_REQUEST_TIMEOUT,
  withCredentials: true    // 带cookie请求
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log(11111);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  console.log(response);
  if (response.data) {
    // 根据返回值判断状态
    if (response.data.errorCode === NO_LOGIN_CODE) {
      router.replace('/login')
    } else if (response.data.errorCode !== 0) {
      $vm.$Message.error(response.data.message);
    }
    return response;
  } else {
    $vm.$Message.error('服务器开小差了，请稍后重试！');
    return Promise.reject({ code: response.status, message: '服务器开小差了，请稍后重试！'});
  }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default axiosInstance
