<template>
  <view>
	<uni-nav-bar fixed="true" left-icon="back" left-text="返回"  @clickLeft="BackPage" 
			title="我的群聊" background-color="#e7ebed" :status-bar="true"></uni-nav-bar>
	<uni-list>
		<uni-list-item v-for="item in list" :key="item.id" 
			:title="item.name" :thumb="item.avatar" :clickable="true" :to="'/pages/chat/chatroom?id=' + item.id">
		</uni-list-item>
	</uni-list>
	<view class="count_box">
		<text>共{{list.length}}个群聊</text>
	</view>
	<view v-if="list.length == 0" class="text-box">
		<text>没有群聊！</text>
	</view>
  </view>
</template>

<script>
  import groupchatapi from '@/pages/api/groupchatapi.js'
  import common from '../api/common.js'
  import {uniList,uniListItem,uniListChat,uniNavBar} from '@dcloudio/uni-ui'
  
  export default {
    name: 'groupchat',
	components: {uniList,uniListItem,uniListChat,uniNavBar},
	data() {
		let data = {
			list: []
		};
		groupchatapi.groupchatList(data);
		return data;
	},
	methods: {
		imageError: function(item) {
			item.avatar = '/static/icon/avatar.png'
		},
		BackPage() {
			common.BackPage()
		}
	},
  }
</script>

<style>
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
	.count_box {
		/* #ifndef APP-NVUE */
		display: flex;
		align-content: center;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap-reverse;
		overflow: hidden;
		height: 80upx; 
		background-color: #FFFFFF;
	}
</style>
