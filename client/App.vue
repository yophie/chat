<script>
	import Vue from 'vue'
	
	export default {
		onLaunch: function() { 
			uni.connectSocket({
			  url: 'wss://www.example.com/socket'
			});
			uni.onSocketMessage(function (res) {
			  console.log('收到服务器内容：' + res.data);
			});
			uni.onSocketOpen(function (res) {
			  Vue.prototype.socketOpen = true;
			});
			
			setTimeout(()=>{
				console.log("ping url")
			  uni.sendSocketMessage({type:'ping'})
			},1000)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "static/iconfont.css";
	/*每个页面公共css */
</style>
