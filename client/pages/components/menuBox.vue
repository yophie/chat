<template>
	<view>
		<view class="arrivalNavigation">
		 <view class="d4"></view>
		 <view class="sideNavigation">
			 <nav hover-stop-propagation="true">
				<navigator url="/pages/chat/newGroup">
				 	<view class="menu-item" @click="click" >
						<span class="iconfont icon_item iconnewgroup"></span>
				 		<text>发起群聊</text>
				 	</view>
				</navigator>
				<!-- <view class="liBottomBorder"></view>
				<navigator url="/pages/chat/request">
					<view class="menu-item" @click="click">
						<span class="iconfont icon_item iconrequest"></span>
						<text>添加朋友</text>
					</view>
				</navigator> -->
			 </nav>
		 </view>
		</view>
	</view>
</template>

<script>
	import {uniIcons} from '@dcloudio/uni-ui'
	export default {
		name: 'menuBox',
		components: {
			uniIcons
		},
		methods: {
			click() {
				this.$emit('callback')
			}
		}
	}
</script>

<style lang="less">
	 //从这里开始是弹出框的样式  不需要搜索框的 前面样式都不用加
	 .arrivalNavigation{
	 	width: 200rpx;
	 	position: absolute;
	    right:20rpx;
	 	z-index: 1024;
	 	.sideNavigation{
			width: 198rpx;
			background-color: #4d4c4e;
			color: #eee;
			border-radius: 10rpx;
			  .menu-item{
				 height: 85rpx;
				 text-align: center;
				 line-height: 85rpx;
				 font-size: 27rpx;
			  }
			  .liBottomBorder{
				border: 0.1rpx solid #373737;
			  }
	 			
	 	}
		.d4{
		// position: absolute;
		//  	left: 140rpx;
			width: 0; 
			height: 0;
			margin-left: 140rpx;
			margin-top: -25rpx;
			border-width:20rpx;
			border-style: solid;
			border-color: transparent #333 transparent transparent;
			transform: rotate(90deg); /*顺时针旋转90°*/
	
		}
	}
	.icon_item {
		margin-right: 8px; 
		font-size: 35rpx;
		color: #FFFFFF;
	}
</style>