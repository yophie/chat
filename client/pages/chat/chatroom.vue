<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回"  @clickLeft="BackPage" 
				:title="name" background-color="#e9e9e9" :status-bar="true"
				  :right-icon="isGroup&isGroupOwner?'more-filled':''" @clickRight="setting"></uni-nav-bar>
		<view class="cu-chat" @click="hidePlusAndKey">
			<view v-for="item in msgList" :key="item.id">
				<view v-if="item.type < 5" >
					<view v-if="item.isSelf" class="cu-item self">
						<view v-if="item.type === 0 || item.type === 1" class="main">
							<view class="content bg-selfContent">
								<rich-text class="text-black" :nodes="item.content"></rich-text>
							</view>
						</view>
						<view v-if="item.type === 2" class="main">
							<redpacket :id="item.id" @click="openPacket" :senderNick="item.senderNick"
									:senderAvatar = "item.senderAvatar"></redpacket>
						</view>
						<view v-if="item.type === 3" class="main" :style="[{width: item.width, height:item.height}]">
							<image class="radius img_message"  :src="item.content" mode="aspectFit" @tap="preivewImg(item.imgIndex)" @load="resize(item, $event)"></image>
						</view>
						<image class="cu-avatar radius" :src="item.senderAvatar" mode="aspectFill" @error="imageError(item)" ></image>
					</view>
					<view v-else-if="item.type != 1 || isGroupOwner" class="cu-item">
						<image class="cu-avatar radius" :src="item.senderAvatar" mode="aspectFill" @error="imageError(item)" ></image>
							<view class="nick_content main">
								<view v-if="isGroup" class="text-gray">
									<view>{{item.senderNick}}</view>
								</view>
								<view v-if="item.type === 0 || item.type === 1" style="justify-content: flex-start; align-items: flex-start;">
									<view class="content" :class="item.type === 1 ? 'bg-grey' : ''">
										<rich-text class="text-black" :nodes="item.content"></rich-text>
									</view>
								</view>
								<view v-if="item.type === 2" class="main">
									<redpacket :id="item.id" @click="openPacket" :senderNick="item.senderNick"
											:senderAvatar = "item.senderAvatar" :isGroup="isGroup"></redpacket>
								</view>
								<view v-if="item.type === 3" class="main" :style="[{width: item.width, height:item.height}]">
									<image class="radius img_message"  :src="item.content" mode="aspectFit" @tap="preivewImg(item.imgIndex)" @load="resize(item, $event)"></image>
								</view>
							</view>
							
						</view>
				</view>
				
				<view v-if="item.type >= 5" class="cu-info">
					<text>{{item.content}}</text>
				</view>
			</view>
			<view :style="[{height: InputBottom + 'upx'}]"></view>
		</view>
		
		<view class="cu-bar foot chat_operate" style="background-color: #f5f5f5;" >
			<!-- <view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view> -->
			<view class="chat_input">
				<view class="input_input" >
					<!-- <textarea class="solid-bottom bg-white input_textarea"
						:auto-height="true" :adjust-position="true" :focus="false" maxlength="100" cursor-spacing="10"
						v-model="sendMsg" @focus="focusInput" @keyboardheightchange="handleKeyboard"></textarea> -->
					<!-- <editor id="editor"></editor> -->
					<view id="chat_input" class="text-black solid-bottom bg-white input_textarea" :contenteditable="true"
						@input="inputUpdate($event)" @paste.native.capture.prevent="paste($event)"></view>
				</view>
				<!-- <view class="action">
					<text class="cuIcon-emojifill text-grey"></text>
				</view> -->
				<span v-if="!isShowExpression" class="iconfont iconbiaoqing" style="margin-left: 15upx; font-size: 30px;" @click="showExpression"></span>
				<span v-if="isShowExpression" class="iconfont iconkeyboard" style="margin-left: 15upx; font-size: 30px;" @click="editfocus()"></span>
				<view v-if="!sendMsg" >
					<uni-icons type="plus" size="30" style="margin-left: 15upx;" @click="showPlusMsgBar"></uni-icons>
				</view>
				
				<button v-if="sendMsg" class="cu-btn bg-green shadow" style="margin-left: 15upx; width: 135upx; height:70upx ;" @click="sendMessage">发送</button>
			</view>
			<view class="line"></view>
			<view v-if="isShowPlusMsgBar" class="plus_button_area">
				<view class="plus_button"> 
					<view class="send_packet_button" @click="toSendPacket">
						<span class="iconfont icon_item iconsendpacket" style="font-size: 40upx;"></span>
					</view>
					<text style="font-size: 20upx;">红包</text>
				</view>
				<view class="plus_button">
					<view class="send_packet_button" @click="toSendPic">
						<span class="iconfont icon_item iconalbum" style="font-size: 40upx;"></span>
					</view>
					<text style="font-size: 20upx;">图片</text>
				</view>
			</view>
			<view v-if="isShowExpression" class="expression_area">
				<view v-for="({img, name}, key) in wxexe" :key="key" class="imglist_item" @tap="addExp(key)">
					<image class="expression"  :src="'../../static/wxex/' + img"></image>
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
	import common, {upload} from '../api/common.js'
	import {uniNavBar, uniIcons, uniPopup} from '@dcloudio/uni-ui'
	import redpacket from '@/pages/components/redpacket.vue'
	import openPacket from '@/pages/chat/openPacket.vue'
	import wxex from '@/pages/api/wxex.js'
	
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
				lastShowTime: 0,
				isShowPlusMsgBar: false,
				showPacket: false,
				packetId: 0,
				senderNick: '',
				senderAvatar: '',
				groupMemNum: 0,
				fromInfo: {},
				friendAvatar: '',
				friendName: '',
				imgList: [],
				fmap: {},
				expression: wxex,
				isShowExpression: false,
				wxexe: wxex.wxex,
				listeners: [],
				reload: true
			}
			return data
		},
		onLoad(options) {
			let id = options.id
			this.id = id
		},
		onShow() {
			chatroomapi.chatroominit(this.$data, this, this.reload)
			this.reload = false
		},
		onUnload() {
			for (let cl of this.listeners) {
				uni.$off(cl.c, cl.l)
			}
		},
		onBackPress(event) {
			this.BackPage()
			return true
		},
		methods: {
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
			inputUpdate(e) {
				if (document.getElementById('chat_input').innerText.length > 200) {
					e.preventDefault()
					e.stopPropagation()
				} else {
					this.sendMsg = document.getElementById('chat_input').innerHTML
				}
			},
			paste(e) {
				let text = (e.originalEvent || e).clipboardData.getData('text/plain');
				let rlen = 200 - document.getElementById('chat_input').innerText.length
				if (text && rlen > 0) {
					document.execCommand("insertText", false, text.substr(0, rlen));
				}
			},
			sendMessage() {
				chatroomapi.sendMessage(this.$data)
				document.getElementById('chat_input').innerHTML = ''
			},
			addExp(code) {
				if (document.getElementById('chat_input').innerText.length > 200) {
					return
				}
				let imgurl = this.wxexe[code].img
				document.getElementById('chat_input').focus();
				
				document.execCommand('insertHTML', true, 
						'<image code="' + code + '!@#@!" src="../../static/wxex/' + imgurl + '" ' + 'style="vertical-align:middle;width:23px; height: 23px"/>');
				document.getElementById('chat_input').blur()
			},
			editfocus() {
				document.getElementById('chat_input').focus();
				this.isShowPlusMsgBar = false
				this.isShowExpression = false
				// this.InputBottom = event.height + this.baseBottom
				this.$nextTick(function(){
					uni.pageScrollTo({
						duration: 0,
						scrollTop: 99999999999
					})
				})
			},
			// handleKeyboard(event) {
			// 	document.getElementById('chat_input').focus();
			// 	this.isShowPlusMsgBar = false
			// 	this.isShowExpression = false
			// 	this.InputBottom = event.height + this.baseBottom
			// 	this.$nextTick(function(){
			// 		uni.pageScrollTo({
			// 			duration: 0,
			// 			scrollTop: 99999999999
			// 		})
			// 	})
			// },
			showPlusMsgBar() {
				uni.hideKeyboard()
				this.isShowPlusMsgBar = true
				this.isShowExpression = false
				this.InputBottom = 350 + this.baseBottom
				this.$nextTick(function(){
					uni.pageScrollTo({
						duration: 0,
						scrollTop: 99999999999
					})
				})
			},
			showExpression() {
				// document.getElementById('chat_input').focus();
				uni.hideKeyboard()
				this.isShowPlusMsgBar = false
				this.isShowExpression = true
				this.InputBottom = 400 + this.baseBottom
				this.$nextTick(function(){
					uni.pageScrollTo({
						duration: 0,
						scrollTop: 99999999999
					})
				})
			},
			hidePlusAndKey() {
				this.isShowPlusMsgBar = false
				this.isShowExpression = false
				uni.hideKeyboard()
				this.InputBottom = this.baseBottom
				this.$nextTick(function(){
					uni.pageScrollTo({
						duration: 0,
						scrollTop: 99999999999
					})
				})
			},
			resize(item, event) {
				item.height = event.detail.height + 'px'
				item.width = event.detail.width + 'px'
			},
			toSendPacket() {
				let groupMemNum = this.groupMemNum > 0 ? this.groupMemNum : 0
				let isG = this.isGroup ? 1 : 2
				let u = '/pages/chat/sendPacket?id=' + this.id + '&isGroup=' + isG
					+ '&groupMemNum=' + groupMemNum
				uni.navigateTo({
					url:  u
				})
			},
			toSendPic() {
				let that = this
				upload('chat-img', function(res) {
					chatroomapi.sendPic(that.$data, res.url)
				}, function error(res) {
					uni.showToast({
						title: '图片发送失败！',
						duration: 2000
					})
				})
			},
			preivewImg(index) {
				uni.previewImage({
					current: index,
					urls: this.imgList,
					indicator: 'default'
				})
			},
			openPacket(param) {
				if (!this.isGroup && param.senderId == uni.getStorageSync("userId")) {
					this.recievePacket(param)
					return
				}
				if (param.state > 0) {
					this.recievePacket(param)
					return
				}
				if (param.surplus <= 0) {
					uni.showToast({
						title: '您手慢了',
						duration: 2000
					})
					this.recievePacket(param)
					return
				}
				this.packetId = param.id
				this.senderNick = param.senderNick
				this.senderAvatar = param.senderAvatar
				this.$refs.popup.open()
			},
			recievePacket(param) {
				this.$refs.popup.close()
				let isG = this.isGroup ? 1 : 2
				uni.navigateTo({
					url: '/pages/chat/packetDetail?packetId=' + param.id + '&isGroup=' + isG
				})
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style scoped>
	.solid-bottom::after {
	    border-bottom: none;
	}
	.bg-selfContent {
		background-color: #44df5d;
		color: #000000;
	}
	.nick_content {
		display: flex;
		flex-direction: column;
		font-size: 25upx;
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
		align-items: flex-end;
		width: 100%;
		padding: 15upx;
		justify-content: space-between;
	}
	.plus_button_area {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 100%;
		height: 300upx;
		margin-left: 50upx;
		margin-top: 25upx;
		background-color:#f5f5f5;
	}
	.plus_button {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 25upx;
	}
	.send_packet_button {
		width: 80upx;
		height: 80upx;
		background-color: #FFFFFF;
		border-radius: 25upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10upx;
	}
	.expression_area {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		height: 350upx;
		background-color:#f5f5f5;
		overflow-y: scroll;
		margin: 15px;
	}
	.expression {
		width:25px;
		height:25px; 
		margin: 10px;
	}
	.line {
		border-top-color: #000000;
		border-top-style: solid;
		border-top-width: 0.01px;
		width: 100%;
		opacity: 0.1;
	}
	.input_textarea {
		font-size: 35upx; 
		margin: 15upx;
		overflow-wrap: break-word;
	}
	.input_textarea:focus{
		outline: none;
	}
	.input_input {
		background-color: #FFFFFF;
		width: 100%; 
		border-radius: 8upx;
	}
	.img_message {
		width: 100%;
		height: 100%;
		max-width: 400upx;
		background-position: right top;
		background-size: contain; 
		background-repeat: no-repeat;
	}
</style>
