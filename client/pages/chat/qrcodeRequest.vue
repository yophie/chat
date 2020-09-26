<template>
	<view>
		
		<view style="text-align:center;margin-top:200upx">
			<view class="text-box">
				<text>已发送好友请求，等待验证中！</text>
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
	
	export default {
		name: 'qrcodeRequest',
		onLoad(options) {
			console.log(options)
			let id = options.id
			requestapi.request(id)
		}
	}
</script>

<style lang="scss">
	
</style>
