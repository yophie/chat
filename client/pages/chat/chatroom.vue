<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回"  @clickLeft="BackPage" 
				:title="name" background-color="#f0f0f0" :status-bar="true"
				  :right-icon="isGroup&isGroupOwner?'more-filled':''" @clickRight="setting"></uni-nav-bar>
		<view class="cu-chat" @click="hidePlusAndKey">
			<view v-for="item in msgList" :key="item.id">
				<view v-if="item.type < 5" >
					<view v-if="item.isSelf" class="cu-item self">
						<view v-if="item.type === 0" class="main">
							<view class="content bg-selfContent">
								<text :selectable="true" class="text-black">{{item.content}}</text>
							</view>
						</view>
						<view v-if="item.type === 2" class="main">
							<redpacket :id="item.id" :isRecived="false" @click="openPacket" :senderNick="item.senderNick"
									:senderAvatar = "item.senderAvatar" :isRemain="item.isRemain"></redpacket>
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
							<redpacket :id="item.id" :isRecived="true" @click="openPacket" :senderNick="item.senderNick"
									:senderAvatar = "item.senderAvatar" :isRemain="item.isRemain"></redpacket>
						</view>
					</view>
				</view>
				
				<view v-if="item.type >= 5" class="cu-info">
					<text>{{item.content}}</text>
				</view>
			</view>
			<view :style="[{height: InputBottom + 'upx'}]"></view>
		</view>
		
		<view class="cu-bar foot input chat_operate" style="background-color: #f0f0f0;" >
			<!-- <view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view> -->
			<view class="chat_input">
				<textarea class="solid-bottom bg-white input_textarea"
					:auto-height="true" :adjust-position="true" :focus="false" maxlength="100" cursor-spacing="10"
				  @input="input" v-model="sendMsg" @focus="focusInput" @keyboardheightchange="handleKeyboard"></textarea>
				<!-- <view class="action">
					<text class="cuIcon-emojifill text-grey"></text>
				</view> -->
				<uni-icons v-if="!sendText" type="plus" size="30" style="margin-left: 15upx;" @click="showPlusMsgBar"></uni-icons>
				<button v-if="sendText" class="cu-btn bg-green shadow" style="margin-left: 15upx; width: 130upx; height:70upx ;" @click="sendMessage">发送</button>
			</view>
			<view class="line"></view>
			<view v-if="isShowPlusMsgBar" class="plus_button_area">
				<view class="send_packet_button" @click="toSendPacket">
				<span class="iconfont icon_item iconsendpacket" style="font-size: 40upx;"></span>
				</view>
			</view>
		</view>
		<uni-popup :id="packetId" ref="popup">
			<open-packet :id="packetId" :senderNick="senderNick" :senderAvatar="senderAvatar" @open="recievePacket" @close="close"></open-packet>
		</uni-popup>
	</view>
</template>

<script>
	import chatroomapi from '@/pages/api/chatroomapi.js'
	import common from '../api/common.js'
	import {uniNavBar, uniIcons, uniPopup} from '@dcloudio/uni-ui'
	import redpacket from '@/pages/components/redpacket.vue'
	import openPacket from '@/pages/chat/openPacket.vue'
	
	export default {
		name: 'chatroom',
		components: {uniNavBar, uniIcons, redpacket,openPacket, uniPopup},
		data() {
			let data = {
				id: 0,
				name: '',
				isGroup: false,
				isGroupOwner: false,
				msgList:[],
				InputBottom: 100,
				baseBottom: 100,
				sendMsg: '',
				maxID: 21,
				sendText: false,
				lastShowTime: 0,
				isShowPlusMsgBar: false,
				showPacket: false,
				packetId: 0,
				senderNick: '',
				senderAvatar: '',
				isRemain: true
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
			},
			handleKeyboard(event) {
				this.isShowPlusMsgBar = false
				this.InputBottom = event.height + this.baseBottom
				this.$nextTick(function(){
					uni.pageScrollTo({
						duration: 0,
						scrollTop: 99999999999
					})
				})
			},
			showPlusMsgBar() {
				uni.hideKeyboard()
				this.isShowPlusMsgBar = true
				this.InputBottom = 350 + this.baseBottom
				this.$nextTick(function(){
					uni.pageScrollTo({
						duration: 0,
						scrollTop: 99999999999
					})
				})
			},
			hidePlusAndKey() {
				this.isShowPlusMsgBar = false
				uni.hideKeyboard()
				this.InputBottom = this.baseBottom
				this.$nextTick(function(){
					uni.pageScrollTo({
						duration: 0,
						scrollTop: 99999999999
					})
				})
			},
			focusInput() {
				this.isShowPlusMsgBar = false
			},
			toSendPacket() {
				uni.navigateTo({
					url: '/pages/chat/sendPacket'
				})
			},
			openPacket(param) {
				this.packetId = param.id
				this.senderNick = param.senderNick
				this.senderAvatar = param.senderAvatar
				this.$refs.popup.open()
			},
			recievePacket(param) {
				this.$refs.popup.close()
				uni.navigateTo({
					url: '/pages/chat/packetDetail?packetId=' + param.id
				})
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style scoped>
	
	.bg-selfContent {
		background-color: #44df5d;
		color: #000000;
	}
	.chat_operate {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	}
	.chat_input {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 100upx;
		justify-content: space-between;
	}
	.plus_button_area {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 100%;
		height: 300upx;
		margin-left: 100upx;
		margin-top: 50upx;
		background-color:#f0f0f0;
	}
	.send_packet_button {
		width: 80upx;
		height: 80upx;
		background-color: #FFFFFF;
		border-radius: 25upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.line {
		border-top-color: #000000;
		border-top-style: solid;
		border-top-width: 0.01px;
		width: 100%;
		opacity: 0.1;
	}
	.input_textarea {
		font-size: 60upx; 
		width: 100%; 
		margin-left: 15upx; 
		border-radius: 8upx;
		padding-top: 5px;
		padding-bottom: 5px;
	}
</style>
