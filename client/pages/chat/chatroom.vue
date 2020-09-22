<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回"  @clickLeft="BackPage" 
				:title="name" background-color="#e7ebed" :status-bar="true"
				  :right-icon="isGroup&isGroupOwner?'more-filled':''" @clickRight="setting"></uni-nav-bar>
		<view class="cu-chat">
			<view v-for="item in msgList" :key="item.id">
				<view v-if="item.type < 5" >
					<view v-if="item.isSelf" class="cu-item self">
						<view v-if="item.type === 0" class="main">
							<view class="content bg-selfContent">
								<text :selectable="true" class="text-black">{{item.content}}</text>
							</view>
						</view>
						<view v-if="item.type === 2" class="main">
							<redpacket :id="1" :isRecived="false"></redpacket>
						</view>
						<image class="cu-avatar radius" :src="item.senderAvatar" mode="aspectFill" @error="imageError(item)" ></image>
					</view>
					<view v-else class="cu-item">
						<image class="cu-avatar radius" :src="item.senderAvatar" mode="aspectFill" @error="imageError(item)" ></image>
						<view v-if="item.type === 0 || item.type === 1" class="main">
							<view class="content" :class="item.type === 1 ? 'bg-grey' : ''">
								<text :selectable="true">{{(item.type === 1 ? '禁言消息：' : '') + item.content}}</text>
							</view>
						</view>
						<view v-if="item.type === 2" class="main">
							<redpacket :id="2" :isRecived="true"></redpacket>
						</view>
					</view>
				</view>
				
				<view v-if="item.type >= 5" class="cu-info">
					<text>{{item.content}}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-bar foot input" style="background-color: #e8e8e8;" >
			<!-- <view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view> -->
			<textarea class="solid-bottom bg-white"  style="font-size: 50upx; width: 80%; margin-left: 13px; border-radius: 8upx;" 
				:auto-height="true" :adjust-position="true" :focus="false" maxlength="100" cursor-spacing="10"
			  @input="input" v-model="sendMsg" ></textarea>
			<!-- <view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view> -->
			<uni-icons v-if="!sendText" type="plus" size="30"></uni-icons>
			<button v-if="sendText" class="cu-btn bg-green shadow" @click="sendMessage">发送</button>
		</view>
		
	</view>
</template>

<script>
	import chatroomapi from '@/pages/api/chatroomapi.js'
	import common from '../api/common.js'
	import {uniNavBar, uniIcons} from '@dcloudio/uni-ui'
	import redpacket from '@/pages/components/redpacket.vue'
	
	export default {
		name: 'chatroom',
		components: {uniNavBar, uniIcons, redpacket},
		data() {
			let data = {
				id: 0,
				name: '',
				isGroup: false,
				isGroupOwner: false,
				msgList:[],
				InputBottom: 0,
				sendMsg: '',
				maxID: 21,
				sendText: false,
				lastShowTime: 0
			}
			return data
		},
		onLoad(options) {
			let id = options.id
			this.id = id
			chatroomapi.chatroominit(this.$data)
			this.$nextTick(function(){
				uni.pageScrollTo({
					duration: 0,
					scrollTop: 99999999999
				})
			})
		},
		methods: {
			input() {
				this.sendText = this.sendMsg != ''
			},
			imageError: function(item) {
				item.senderAvatar = '/static/icon/avatar.png'
			},
			scrolltoupper:function() {
				
			},
			BackPage() {
				uni.switchTab({
					url: '/pages/chat/chat'
				})
			},
			setting() {
				if (this.isGroup & this.isGroupOwner) {
					uni.navigateTo({
						url: "/pages/chat/chatsetting?id=" + this.id
					})
				}
			},
			sendMessage() {
				chatroomapi.sendMessage(this.$data)
				this.$nextTick(function(){
					uni.pageScrollTo({
						duration: 100,
						scrollTop: 99999999999
					})
				})
			}
		}
	}
</script>

<style>

	page{
	  padding-bottom: 100upx;
	}
	
	.bg-selfContent {
		background-color: #44df5d;
		color: #000000;
	}
	
</style>
