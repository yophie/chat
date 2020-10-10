<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回" @clickLeft="BackPage" 
			title="我的二维码" background-color="#e9e9e9" :status-bar="true" :border="false"></uni-nav-bar>
		<view style="text-align:center;margin-top:200upx">
			<vue-qr :text="url" :size="200"></vue-qr>
			<view class="text-box">
				<text>微信扫描二维码加我好友</text>
			</view>
		</view>
	</view>
  
</template>

<script>
	import common from '@/pages/api/common.js'
	import {uniNavBar} from '@dcloudio/uni-ui'
	import vueQr from 'vue-qr'
	import config from '@/pages/api/config.js'
	
	export default {
		name: 'myqrcode',
		components: {uniNavBar, vueQr},
		data() {
			let data = {
				url: config.getConfig().clienturl + '/#/pages/chat/qrcodeRequest?id=' + uni.getStorageSync('userId')
			}
			return data
		},
		methods: {
			BackPage() {
				common.BackPage()
			}
		}
	}
</script>
