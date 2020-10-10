<template>
</template>

<script>
	import wechatLogin from '@/pages/api/wechatLogin.js'
	import webSocketHandle from '@/pages/api/webSocketHandle.js'
	import {getToken} from '@/pages/api/common.js'
	
	export default {
		onLoad(options) {
			let token = getToken()
			let username = 'cs'
			let password = 'test'
			if (!token) {
				wechatLogin.login()
				//webSocketHandle.initpass(username, password)
				// uni.switchTab({
				// 	url: "/pages/chat/chat"
				// })
			} else {
				webSocketHandle.init(token)
				uni.switchTab({
					url: "/pages/chat/chat"
				})
			}
		}
	}
</script>

<style>
</style>
