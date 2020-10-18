<script>
	import Vue from 'vue'
	import wechatLogin from '@/pages/api/wechatLogin.js'
	import webSocketHandle from '@/pages/api/webSocketHandle.js'
	import {http, getToken, tabbarreddot} from '@/pages/api/common.js'
	
	export default {
		onLaunch: function() { 
		},
		onShow: function() {
			if (location.hash.indexOf('#/pages/login') >= 0 || location.hash.indexOf('#/pages/loginback') >= 0) {
				return
			}
			let requestId = 0
			if (location.hash.indexOf('#/pages/chat/qrcodeRequest') >= 0) {
				let query = location.search.substring(1);
				let param = query.split("&");
				for (let p of param) {
				   let pair = p.split("=");
				   if (pair[0] == 'id') {
					   requestId = pair[1]
					   break
				   }
				}
				if (!requestId || requestId <= 0) {
					uni.showModal({
					    title: '错误提示',
					    content: '缺少好友ID，请好友退出系统重新获取二维码！'
					});
					return
				}
			}
			let ua = window.navigator.userAgent.toLowerCase()
			let iswechat = false
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				iswechat = true
				uni.setStorageSync("platform", 'wechat')
			}
			
			let token = getToken()
			if (!token) {
				if (iswechat){
					wechatLogin.login(requestId)
				} else {
					uni.navigateTo({
						url: '/pages/loginWithAccount?requestId=' + requestId
					})
				}
			} else if (requestId <= 0) {
				http.post('api/user/info', {}, function(res) {
					if (res.code == '10003') {
						webSocketHandle.init(token)
						uni.setStorageSync("requestNum", 0)
						uni.$on("request", function(num) {
							let requestNum = uni.getStorageSync("requestNum") + num
							uni.setStorageSync("requestNum", requestNum)
							tabbarreddot()
						})
					} 
				})
			}
			
		},
		onHide: function() {
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "static/iconfont.css";
	/*每个页面公共css */
</style>
