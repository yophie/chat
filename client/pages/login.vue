<template>
</template>

<script>
	import wechatLogin from '@/pages/api/wechatLogin.js'
	import webSocketHandle from '@/pages/api/webSocketHandle.js'
	import {getToken} from '@/pages/api/common.js'
	
	export default {
		onLoad(options) {
			let token = getToken()
			if (!token) {
				if (uni.getStorageSync('platform') == 'wechat') {
					wechatLogin.login()
				} else {
					uni.navigateTo({
						url: '/pages/loginWithAccount'
					})
				}
			} else {
				webSocketHandle.init()
				uni.switchTab({
					url: "/pages/chat/chat"
				})
			}
		}
	}
</script>

<style>
</style>
