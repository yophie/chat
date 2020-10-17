<template>
	<view style="margin-top:50px;margin-left: 15px;margin-right: 15px;">
		<view style="font-size: 30px; margin-bottom: 15px;">
			用户登录
		</view>
		<view class="input-column">
			<view class="title">帐号</view>
			<input type="text" v-model="account" maxlength="30" class="uni-input" :focus="true" placeholder="请填写用户名" />
		 </view>
		 <view class="line"></view>
		 <view class="input-column">
		 	<view class="title">密码</view>
		 	<input type="password" v-model="password" maxlength="30" class="uni-input" placeholder="请填写密码" />
		  </view>
		  <view class="line"></view>
		<button type="default" class="button" @click="login" :disabled="!this.account || !this.password">登录</button>
	</view>
</template>

<script>
	import {http,setToken} from '@/pages/api/common.js' 
	import webSocketHandle from '@/pages/api/webSocketHandle.js'
	export default {
	  name: 'loginWithAccount',
	  data() {
		  let data = {
			  account: '',
			  password: '',
			  requestId: 0
		  }
		  return data
	  },
	  onLoad(options) {
		  this.requestId = options.requestId
	  },
	  methods: {
		  login() {
			let that = this
			http.post('api/user/loginwithaccount', this.$data,function(res) {
			  if (res.code == '10008') {
			  	uni.showModal({
			  	    title: '错误提示',
			  	    content: '用户名或密码错误！'
			  	});
			  } else if (res.code == '10007' && res.token) {
				  setToken(res.token)
				  webSocketHandle.init(res.token)
				  if (that.requestId > 0) {
					  uni.navigateTo({
					  	url: "/pages/chat/qrcodeRequest?id=" + that.requestId
					  }) 
				  } else {
					 uni.switchTab({
					 	url: "/pages/chat/chat"
					 })  
				  }
			  } else {
			  	uni.showModal({
			  	    title: '错误提示',
			  	    content: '登录失败，请稍后再试！'
			  	});
			  }
			})
		  }
	  }
	 }
</script>

<style>
	.input-column {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-top: 25px;
	}
	.button {
		background-color: #19b851;
		margin-top: 40px;
	}
	.title {
	   padding: 5px 13px;
	}
	.uni-input {
		height: 28px;
		line-height: 28px;
		font-size: 15px;
		padding: 0px;
		flex: 1;
	 }
	 .line {
		 border-bottom: solid 0.01px rgba(0,0,0,0.1) ;
	 }
</style>
