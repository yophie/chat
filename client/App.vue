<script>
	import Vue from 'vue'
	import wechatLogin from '@/pages/api/wechatLogin.js'
	import webSocketHandle from '@/pages/api/webSocketHandle.js'
	import {getToken} from '@/pages/api/common.js'
	
	export default {
		onLaunch: function() { 
		},
		onShow: function() {
			if (location.hash == '#/pages/login' || location.hash == '#/pages/loginback') {
				return
			}
			if (location.hash == '#/pages/chat/qrcodeRequest') {
				let query = location.search.substring(1);
				let param = query.split("&");
				for (let p of param) {
				   let pair = p.split("=");
				   if (pair[0] == 'id') {
					   requestId = pair[1]
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
			let token = getToken()
			let username = 'cs'
			let password = 'test'
			let requestId = -1
			if (!token) {
				wechatLogin.login(requestId)
				// webSocketHandle.initpass(username, password)
				// uni.switchTab({
				// 	url: "/pages/chat/chat"
				// })
			} else {
				webSocketHandle.init(token)
				uni.switchTab({
					url: 'pages/chat/chat'
				})
			}
			
		},
		onHide: function() {
		//	console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "static/iconfont.css";
	/*每个页面公共css */
</style>
