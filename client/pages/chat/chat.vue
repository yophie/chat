<template>
	<view>
		<uni-nav-bar fixed="true" title="聊天" background-color="#e9e9e9" 
				  :status-bar="true" :border="false">
			 <view slot="right" @click="showMenu()">
				 <span class="iconfont iconplus icon_item"></span>
			 </view>
		</uni-nav-bar>
		<menuBox v-if="isShowMenu" v-on:callback="hideMenu"></menuBox>
		<view class="cpt-mask" v-if="isShowMenu" @tap.stop="hideMenu"></view>
		<uni-list :border="true">
			<uni-list-chat v-for="item in list" :key="item.id" 
				:title="item.name" :avatar="item.avatar"  :clickable="true"
				:time="item.lastTime" badge-positon="left" :badge-text="item.unread" :to="'/pages/chat/chatroom?id=' + item.id">
				<view slot="note">
					<rich-text class="uni-list-chat__content-note uni-ellipsis" :nodes="item.lastMsg"></rich-text>
				</view>
			</uni-list-chat>
		</uni-list>
		<view v-if="list.length === 0" class="text-box">
			<text>还没有聊天！</text>
		</view>
	</view>
</template>

<script>
	import chatapi from '@/pages/api/chatapi.js'
	import {uniNavBar, uniList,uniListItem,uniListChat} from '@dcloudio/uni-ui'
	import menuBox from '@/pages/components/menuBox.vue'
	import wxex from '@/pages/api/wxex.js'
	export default {
		name: 'chat',
		components: {uniList,uniListItem,uniListChat,uniNavBar,menuBox},
		data() {
			let data = {
				list: [],
				isShowMenu: false,
				listeners: []
			};
			return data;
		},
		onShow() {
			this.list = []
			chatapi.getChatList(this.$data);
		},
		onUnload() {
			for (let cl of this.listeners) {
				uni.$off(cl.c, cl.l)
			}
		},
		methods: {
			imageError(item) {
				item.avatar = '/static/icon/avatar.png'
			},
			showMenu() {
				this.isShowMenu = true
			},
			hideMenu(e) {
				this.isShowMenu = false
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.cpt-mask {  
		position: fixed;  
		top: 0;  
		left: 0;  
		width: 100%;  
		height: 100%;    
		opacity: 0;  
		z-index: 1000;  
	}  
	.icon_item {
		font-size: 40rpx;
	}
	.uni-list-chat__content-note {
		margin-top: 3px;
		color: #999;
		font-size: 12px;
		font-weight: normal;
		overflow: hidden;
	}
	.uni-ellipsis {
		/* #ifndef APP-NVUE */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
	}
</style>
