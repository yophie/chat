import Axios from 'axios'

import router from '@/router/index.js'
import { MessageBox } from "element-ui";  // 引入

export const http = Axios.create();

http.defaults.baseURL = process.env.BASE_URI

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
http.defaults.headers['Authorization'] = window.localStorage.getItem('token');

export const goPath = function (path) {
  router.push(path);
}
export const back = function () {
  router.back();
}

export const setToken = function (token) {
  window.localStorage.setItem('token', token)
  http.defaults.headers['Authorization'] = token;
}
export const removeToken = function () {
  window.localStorage.setItem('token', '')
  http.defaults.headers['Authorization'] = '';
}

Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

export const dateFormat = function (time) {
  if (!time) {
    return ''
  }
  let date = new Date(time)
  return date.format("yyyy-MM-dd hh:mm")
}
