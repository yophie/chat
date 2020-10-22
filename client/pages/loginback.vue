
<script>
	import Qs from 'qs'
	import {http,getToken,setToken} from '@/pages/api/common.js'
	import webSocketHandle from '@/pages/api/webSocketHandle.js'
	
	export default {
		name: "index",
		onLoad(options) {
			let code = ''
			let state = ''
			let query = location.search.substring(1);
		   let param = query.split("&");
		   for (let p of param) {
			   let pair = p.split("=");
			   if (pair[0] == 'code') {
				   code = pair[1]
			   }
			   if (pair[0] == 'state') {
					state = pair[1]
			   }
		   }
		   if (code) {
			   http.get('api/user/callback', {code: code}, function(res) {
				   if (res.code != 10007) {
					   uni.showModal({
					       title: '错误提示',
					       content: '登录失败，请稍后再试！'
					   });
					   return
				   }
				   setToken(res.token)
				   if (!state || state == '' || state == 'undefined' || state <= 0) {
						webSocketHandle.init()
						uni.switchTab({
							url: "/pages/chat/chat"
						}) 
				   } else {
					   uni.navigateTo({
					   	url: "/pages/chat/qrcodeRequest?id=" + state
					   }) 
				   }
				   
			   })
		   }
		}
	}
</script>

<style>
</style>
