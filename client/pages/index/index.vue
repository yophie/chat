<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		name: 'index',
		onLoad(options) {
			console.log(options)
			uni.switchTab({
				url: '/pages/chat/chat'
			})
		}
	}
</script>

<style>

</style>
