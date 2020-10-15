import Vue from 'vue' 
import {setToken,getToken} from './common.js'
import config from './config.js'

var socketMsgQueue = []
const url = config.getConfig().websocketServerurl
export default {
	initpass(username, password) {
		 let u = url + '?username=' + username + '&password=' + password
		 this._init(u)
	},
	init(token) {
		 let u = url + '?token=' + token
		 this._init(u)
	},
	_init(u) {
		let that = this
		uni.connectSocket({
		  url: u
		});
		uni.onSocketError(function (res) {
			Vue.prototype.socketOpen = false
		  console.log('WebSocket连接打开失败，请检查！');
		  that.reconnect(u)
		});
		uni.onSocketMessage(function (res) {
		  that.handleMessage(res)
		});
		uni.onSocketOpen(function (res) {
		  Vue.prototype.socketOpen = true
		  for (let i = 0; i < socketMsgQueue.length; i++) {
		    that.sendMessage(socketMsgQueue[i]);
		  }
		  socketMsgQueue = [];
		});
		uni.onSocketClose(function(){
			Vue.prototype.socketOpen = false;
			that.reconnect(u)
		})
		
	},
	reconnect(u) {
	    setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
	      uni.connectSocket({
	        url: u
	      });
	    }, 2000);
	},
	handleMessage(res) {
		if (!res || !res.data) {
			return
		}
		
		let result = eval('(' + res.data + ')')
		if (result && result.user && result.cmd == 6 && result.code == '10007') {
			setToken(result.token)
			uni.setStorageSync("userId", result.user.userId)
			uni.setStorageSync("userName", result.user.nick)
			uni.setStorageSync("avatar", result.user.avatar)
			uni.$emit("request", result.user.newFriends)
			return
		}
		if (result.cmd == 34) {
			uni.$emit("request", 1)
		} else {
			uni.$emit('cmd' + result.cmd, result)
		}
	},
	sendMessage(msg) {
		console.log("send " + JSON.stringify(msg))
		if (Vue.prototype.socketOpen) {
			uni.sendSocketMessage({
			  data: JSON.stringify(msg),
			  success: function(res) {
				  console.log("success" + res)
			  },
			  fail: function(res) {
				  console.log("error" + res)
			  }
			});
		} else {
			socketMsgQueue.push(msg);
		}
		
	}
}