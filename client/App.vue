<script>
	import Vue from 'vue'
	import wechatLogin from '@/pages/api/wechatLogin.js'
	import webSocketHandle from '@/pages/api/webSocketHandle.js'
	
	export default {
		onLaunch: function() { 
			
		},
		onShow: function() {
			let token = uni.getStorageSync("token")
			let username = 'cs'
			let password = 'test'
			if (!token) {
				//wechatLogin.login()
				webSocketHandle.initpass(username, password)
			} else {
				webSocketHandle.init(token)
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
