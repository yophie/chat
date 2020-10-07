<template>
  <view>
	<uni-nav-bar fixed="true" title="发现" background-color="#e9e9e9" :status-bar="true" :border="false">
		<view slot="right" @click="toPost">
			<span class="iconfont iconplus icon_item"></span>
		</view>	
	</uni-nav-bar>
	<uni-list :border="true">
		<view v-for="item in list" :key="item.id">
			<uni-list-item>
				<view slot="header">
					<view class="uni-list-item__icon" style="margin-right: 10px;">
						<image :src="item.avatar" class="uni-list-item__icon-img uni-list--lg" />
					</view>
				</view>
				<view slot="body">
					<view class="uni-list-item__content uni-list-item__content--center">
						<text class="uni-list-item__content-title">{{ item.name }}</text>
						<text class="uni-list-item__content-note">{{ item.content }}</text>
						<text class="uni-list-item__content-time">{{item.time}}</text>
					</view>
				</view>
			</uni-list-item>
		</view>
	</uni-list>
	<view v-if="list.length == 0" class="text-box">
		<text>还没有朋友圈！</text>
	</view>
  </view>
</template>

<script>
	import discoverapi from '@/pages/api/discoverapi.js'
	import {uniNavBar,uniList,uniListItem,uniListChat} from '@dcloudio/uni-ui'
	export default {
		name: 'discover',
		components: {uniNavBar,uniList,uniListItem,uniListChat},
		data() {
			let data = {
				list: []
			}
			discoverapi.initDiscover(data)
			return data
		},
		methods: {
			toPost() {
				uni.navigateTo({
					url: '/pages/discover/post'
				})
			}
		}
	}
</script>

<style lang="scss">
	.text-box {
		/* #ifndef APP-NVUE */
		display: flex;
		align-content: center;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap-reverse;
		overflow: hidden;
		padding-top: 300upx; 
	}
	.uni-list-item__icon-img {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		height: $uni-img-size-base;
		width: $uni-img-size-base;
	}
	.uni-list--lg {
		height: $uni-img-size-lg;
		width: $uni-img-size-lg;
	}
	.uni-list-item__content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		padding-right: 8px;
		flex: 1;
		color: #3b4144;
		// overflow: hidden;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
		flex-wrap: wrap;
		width: 650upx;
	}
	
	.uni-list-item__content--center {
		justify-content: center;
	}
	
	.uni-list-item__content-title {
		font-size: $uni-font-size-base;
		color: #3b4144;
		overflow: hidden;
	}
	.uni-list-item__content-note {
		margin-top: 6rpx;
		color: #000000;
		font-size: $uni-font-size-sm;
		word-wrap:break-word;
		width: 90%;
	}
	.uni-list-item__content-time {
		margin-top: 10rpx;
		color: $uni-text-color-grey;
		font-size: $uni-font-size-sm;
		overflow: hidden;
	}
	.icon_item {
		font-size: 40rpx;
	}
</style>
