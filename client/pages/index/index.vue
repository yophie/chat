<template>
</template>

<script>
	export default {
		onLoad(options) {
			if (uni.getStorageSync('token')) {
				uni.switchTab({
					url: '/pages/chat/chat'
				})
			}
			
		}
	}
</script>

<style>

</style>
