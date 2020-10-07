<template>
	<view class="redpacket_content bg-redpacketColor" :class="isRecived || !isRemain ? 'received' : ''" @click="_onClick">
		 <view class="redpacket">
			 <view class="redpacket_body">
				 <view>
					 <image src="@/static/icon/redpacket.png"
						class="icon_item"></icon>
				 </view>
				 <text class="">恭喜发财，大吉大利</text>
			 </view>
			 <view class="redpacket_line"></view>
			 <view class="redpacket_bottom">
				 <text class="">红包</text>
			 </view>
		 </view>
	</view>
</template>

<script>
	import redpacketApi from '@/pages/api/redpacketApi.js'
	
	export default {
		name: 'redpacket',
		props: {
			id: {
				type: String
			},
			senderNick: {
				type: String,
				default: ''
			},
			senderAvatar: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				isRecived: false,
				isRemain:true
			}
		},
		mounted(options) {
			redpacketApi.packetInit(this.$data, this.id)
		},
		methods: {
			_onClick() {
				let param = {
					id: this.id,
					senderNick: this.senderNick,
					senderAvatar: this.senderAvatar,
					canRecieve: !this.isRecived && this.isRemain 
				}
				this.$emit('click', param)
			}
		}
	}
</script>

<style>
	.redpacket {
		font-size: 25upx;
		height: 120upx;
		width: 350upx;
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		overflow: hidden;
	}
	.redpacket_body {
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: center;
		overflow: hidden;
		align-items: center;
		height: 80upx;
	}
	.redpacket_line {
		border-top-color: #FFFFFF;
		border-top-style: solid;
		border-top-width: 0.1px;
		width: 100%;
		opacity: 0.1;
	}
	.redpacket_bottom {
		font-size: 18upx;
		align-items: flex-start;
		opacity: 0.7;
	}
	.icon_item {
		height: 80upx;
		width: 70upx;
		margin-right: 15upx;
	}
	.bg-redpacketColor {
		background-color: #ff8b24;
		color: #ffffff;
	}
	.received {
		opacity: 0.6;
	}
</style>
