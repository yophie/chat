<template>
	<view>
		<uni-nav-bar fixed="true" title="通讯录" background-color="#e9e9e9"
				 :status-bar="true" :border="false">
			<view slot="right" @click="showMenu()">
				<span class="iconfont iconplus icon_item"></span>
			</view>	
		</uni-nav-bar>
		<menuBox v-if="isShowMenu" id="menuBox" v-on:callback="hideMenu"></menuBox>
		<view class="cpt-mask" v-if="isShowMenu" @tap.stop="hideMenu"></view>
		<uni-list>
			<uni-list-item title="新的朋友" thumb="/static/icon/newfriend.png" to="/pages/contacts/requestList" showArrow="true"></uni-list-item>
			<uni-list-item title="我的群聊" thumb="/static/icon/groupchat.png" to="/pages/contacts/groupchat" showArrow="true"></uni-list-item>
		</uni-list>
		<!-- <block v-for="item in list" :key="item.index">
			<view :class="'indexItem-' + item.index"  :data-index="item.index">
		 		<view class="padding-xs">{{item.index}}</view> -->
				<uni-list :border="true">
					<uni-list-item v-for="item in list" :key="item.id" 
						:title="item.name" :thumb="item.avatar" :clickable="true" 
						:to="'/pages/chat/chatroom?id=' + item.friendId">
					</uni-list-item>
				</uni-list>
			<!-- </view>
		</block> -->
		<view class="count_box">共{{count}}位联系人</view>
    </view>
</template>

<script>
	import contactsapi from '@/pages/api/contactsapi.js'
	import {uniList,uniListItem,uniListChat,uniNavBar} from '@dcloudio/uni-ui'
	import menuBox from '@/pages/components/menuBox.vue'
	
	export default {
		name: 'contacts',
		components: {uniList,uniListItem,uniListChat,uniNavBar,menuBox},
		data() {
			let data = {
				list: [],
				isShowMenu: false,
				count: 0
			}
			return data;
		},
		onShow() {
			this.$data.list = []
			this.$data.count = 0
			this.$data.isShowMenu = false
			contactsapi.contactList(this.$data)
		},
		methods: {
			imageError: function(item) {
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

<style>
	.indexes {
		position: relative;
	}
	.cpt-mask {  
		position: fixed;  
		top: 0;  
		left: 0;  
		width: 100%;  
		height: 100%;  
		background-color: #000000;  
		opacity: 0;  
		z-index: 1000;  
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
	.icon_item {
		font-size: 40rpx;
	}
</style>