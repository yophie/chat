import Axios from 'axios'

import router from '@/router/index.js'
import { MessageBox } from "element-ui";  // 引入
import Vue from 'vue'

export const http = Axios.create();

http.defaults.baseURL = '/services'

function callback(res) {
  if (res && res.data && res.data.code && res.data.code == '10010') {
    MessageBox.alert('登录超时，请重新登录', '登录超时', {
      type: 'warning',callback:function() {
        router.push('/login');
      }
    });
    return Promise.reject(res);
  }
  return res;
}

function errCallback(err) {
  // if (err && err.response && err.response.data && err.response.data.message) {
  //   MessageBox.alert(err.response.data.message, '错误', { type: "error" });
  // } else {
    MessageBox.alert('加载失败！', '错误', { type: "error" });
 // }
  return Promise.reject(err)
}

http.interceptors.response.use(callback, errCallback)

export const goPath = function (path) {
  router.push(path);
}
export const back = function () {
  router.back();
}

export const setToken = function (token) {
  http.defaults.headers['Authorization'] = token;
}
export const removeToken = function () {
  http.defaults.headers['Authorization'] = '';
}
