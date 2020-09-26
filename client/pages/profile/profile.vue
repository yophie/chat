<template>
	<view>
		<uni-nav-bar fixed="true" title="我" background-color="#f0f0f0" :status-bar="true" :border="false"></uni-nav-bar>
		<uni-list style="margin-bottom: 20rpx; height:160rpx; justify-content: center;" :border="false">
		    <uni-list-item :title="name" showArrow="true" :note="note">
				<view slot="header">
					<view class="uni-list-chat__header">
						<image class="uni-list-chat__header-image" :src="avatar" mode="aspectFill"></image>
					</view>
				</view>
			</uni-list-item>
		</uni-list>
		<uni-list>
		    <uni-list-item title="我的二维码" thumb="/static/icon/qrcode.png" to="/pages/profile/myqrcode" showArrow="true"></uni-list-item>
			<uni-list-item title="账单" thumb="/static/icon/wallet.png" to="/pages/profile/bill" showArrow="true"></uni-list-item>
			<uni-list-item title="提现" thumb="/static/icon/withdraw.png" to="/pages/profile/withdraw" showArrow="true"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import profileapi from '@/pages/api/profileapi.js'
	import {uniList,uniListItem,uniNavBar} from '@dcloudio/uni-ui'
 
    export default {
      name: 'profile',
	  components: {uniList,uniListItem,uniNavBar},
	  data() {
		  let data = {
			  id: 0,
			  name: "",
			  avatar: '',
			  note: ''
		  }
		  profileapi.init(data)
		  return data
	  }
    }
</script>

<style>
	.uni-list-chat__header {
		/* #ifndef APP-NVUE */
		display: flex;
		align-content: center;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap-reverse;
		/* #ifdef APP-NVUE */
		width: 80rpx;
		height: 80rpx;
		/* #endif */
		/* #ifndef APP-NVUE */
		width: 80rpx;
		height: 80rpx;
		/* #endif */
	
		border-radius: 5px;
		border-color: #eee;
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		margin-right: 18rpx;
	}
	.uni-list-chat__header-image {
		margin: 1px;
		/* #ifdef APP-NVUE */
		width: 80rpx;
		height: 80rpx;
		/* #endif */
		/* #ifndef APP-NVUE */
		width: 80rpx;
		height: 80rpx;
		/* #endif */
	}
</style>