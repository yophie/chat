import Vue from 'vue' 
import {setToken,getToken} from './common.js'
import config from './config.js'

var socketMsgQueue = []
const url = config.getConfig().websocketServerurl
export default {
	init() {
		let that = this
		if (Vue.prototype.socketOpen == true) {
			return
		}
		uni.connectSocket({
		  url: url + '?token=' + getToken()
		});
		uni.onSocketError(function (res) {
			Vue.prototype.socketOpen = false
		  console.log('WebSocket连接打开失败，请检查！');
		  if (getToken()) {
			that.reconnect()
		  }
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
			if (getToken()) {
				that.reconnect()
			}
		})
		
	},
	reconnect(u) {
	    setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
	      uni.connectSocket({
	        url: url + '?token=' + getToken()
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
		if (result && result.cmd == 37) { //可能退出本地登录
			uni.showModal({
				title: '提醒',
				content: '账号在其他设备登录，请确保账号安全！'
			})
			uni.removeStorageSync('token')
			uni.removeStorageSync("userId")
			uni.removeStorageSync("userName")
			uni.removeStorageSync("avatar")
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