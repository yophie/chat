<template>
  <view>
	<uni-nav-bar fixed="true" left-icon="back" left-text="返回"  @clickLeft="BackPage" 
			title="新的朋友" background-color="#f0f0f0" :status-bar="true" :border="false"></uni-nav-bar>
	<uni-list :border="true">
		<uni-list-chat v-for="item in list" :key="item.id" 
			:title="item.name" :avatar="item.avatar" :clickable="true"
			:note="item.msg" :to="'/pages/chat/chatroom?id=' + item.id + '&name=' + item.name">
			<view class="uni-list-chat__content-extra">
				<view v-if="item.status === 0" >
					<button class="cu-btn text-green sm" @click.stop="accept(item)" style="margin-right: 4px;">接受</button>
					<button class="cu-btn text-green sm" @click.stop="reject(item)">拒绝</button>
				</view>
				<view v-else>
					<text v-if="item.status === 1">
						已添加
					</text>
					<text v-if="item.status === 2">
						已拒绝
					</text>
				</view>
			</view>
		</uni-list-chat>
	</uni-list>
	<view v-if="list.length === 0" class="text-box">
		<text>没有朋友验证！</text>
	</view>
  </view>
</template>

<script>
  import requestListapi from '@/pages/api/requestListapi.js'
  import common from '../api/common.js'
  import {uniList,uniListItem,uniListChat,uniNavBar} from '@dcloudio/uni-ui'
  
  export default {
    name: 'requestList',
	components: {uniList,uniListItem,uniListChat,uniNavBar},
	data() {
		let data = {
			list: []
		};
		requestListapi.requestList(data);
		return data;
	},
	methods: {
		imageError: function(item) {
			item.avatar = '/static/icon/avatar.png'
		},
		BackPage() {
			common.BackPage()
		},
		accept(request) {
			requestListapi.accept(request)
		},
		reject(request) {
			requestListapi.reject(request)
		}
	},
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
	.uni-list-chat__content-extra {
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		margin-left: 5px;
		font-size: $uni-font-size-sm;
	}
</style>
