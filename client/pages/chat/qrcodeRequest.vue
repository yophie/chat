<template>
	<view>
		
		<view v-if="success!=0" style="text-align:center;margin-top:200upx">
			<view class="text-box">
				<text v-if="success==1">已发送好友请求，等待验证中！</text>
				<text v-if="success==2">发送好友请求失败，请重试！</text>
			</view>
			<image src="@/static/officalCode.jpeg" mode="aspectFit"
					style="width: 350upx; height: 350upx;"></image>
			<view class="text-box">
				<text>立即识别图中二维码，关注公众号开始聊天吧！</text>
			</view>
		</view>
	</view>
</template>

<script>
	import requestapi from '@/pages/api/requestapi.js'
	import wechatLogin from '@/pages/api/wechatLogin.js'
	
	export default {
		name: 'qrcodeRequest',
		data() {
			return {
				success: 0
			}
		},
		onLoad(options) {
			let id = options.id
			let token = uni.getStorageSync("token")
			let that = this
			if (token) {
				requestapi.request(id, function() {
					that.success = 1
				}, function() {
					that.success = 2
				})
			} else {
				wechatLogin.login(id)
			}
		}
	}
</script>

<style lang="scss">
	
</style>
