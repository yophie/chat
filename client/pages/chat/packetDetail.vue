<template>
	<view style="background-color: #FFFFFF;">
		<uni-status-bar />
		<view class="packet_header">
			<uni-icons color="#FFFFFF" type="back" size="24" class="left_icon" @click="BackPage"/>
		</view>
		<view class="packet_area">
			<view class="packet_sender" style="margin-top: 30px;">
				<image :src="senderAvatar" style="width: 50upx; height: 50upx;"></image>
				<view>
					<text style="font-weight: bold; font-size: 35upx;">{{senderNick}}的红包</text>
				</view>
				<view v-if="packetType == 0" class="luck">拼</view>
			</view>
			<view v-if="recieveAmount > 0" class="recieve_amount">
				<view>
					<text style="color: #c59e5f">{{recieveAmountShow}}</text>
				</view>
				<view>
					<text style="color: #c59e5f; font-size: 30upx; margin-left: 5px;">元</text>
				</view>
			</view>
			<view v-else class="blessing">
				<text class="text-gray">恭喜发财，大吉大利</text>
			</view>
			<view v-if="packetType==3 && isSender" class="text-gray" style="margin-left: 15px;">
				<text>{{packetNum}}个红包共{{totalAmount}}元</text>
			</view>
			<view v-if="packetType!=3" class="text-gray" style="margin-left: 15px;">
				<view v-if="isRemain">
					<text>已领取{{recievedNum}}/{{packetNum}}个</text>
					<text v-if="isSender">，共{{recievedAmount}}/{{totalAmount}}元</text>
				</view>
				<view v-else>
					<text>{{packetNum}}个红包</text>
					<text v-if="isSender">共{{totalAmount}}元</text>
					<text>,已抢完</text>
				</view>
			</view>
		</view>
		<view>
			<uni-list :border="true" class="packet_list">
				<uni-list-chat v-for="item in list" :key="item.id" 
					:title="item.name" :avatar="item.avatar" :note="item.recieveTime" 
					:time="item.amount">
				</uni-list-chat>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import packetDetailApi from '@/pages/api/packetDetailApi.js'
	import {uniNavBar, uniList,uniListItem,uniListChat,uniStatusBar,uniIcons} from '@dcloudio/uni-ui'
	import common from '../api/common.js'
	
	export default {
		name: 'packetDetail',
		components: {uniList,uniListItem,uniListChat,uniNavBar,uniStatusBar,uniIcons},
		data() {
			let data = {
				list: [],
				senderAvatar: '',
				senderNick: '',
				packetNum: 0,
				recieveAmount: 0,
				totalAmount: 0,
				isSender: false,
				recievedNum: 0,
				packetType: 0, //0 拼  1 普 2 个人
				recievedAmount: 0,
				recievedNum: 0,
				isRemain: false
			};
			return data;
		},
		onLoad(options) {
			let id = options.packetId
			packetDetailApi.init(id, this.$data);
		},
		computed: {
			recieveAmountShow() {
				let f = common.fixed(this.recieveAmount, 2); 
				if (f <= 0) {
					return '0.00'
				}
				let s = f.toString(); 
				let index = s.indexOf('.'); 
				if (index < 0) { 
					index = s.length; 
					s += '.'; 
				} 
				
				while (s.length <= index + 2) { 
					s += '0'; 
				} 
				return s; 
			}	
		},
		methods: {	
			BackPage() {
				common.BackPage()
			}
		}
	}
</script>

<style>
	.packet_sender {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		top: 100px;
	}
	.recieve_amount {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		font-size: 80upx;
		margin-bottom: 30px;
		margin-top: 10px;
	}
	.blessing {
		display: flex;
		justify-content: center;
		font-size: 30upx;
		margin-bottom: 30px;
		margin-top: 10px;
	}
	.packet_header {
		position: fixed;
		width: 100%;
		height: 100px;
		border-radius: 100% 100% 100% 100% / 0% 0% 90% 90%;
		border-bottom:2px solid gold;
		background-color: #ee3e34;
		z-index: 999;
	}
	.packet_area {
		position: fixed;
		top: 140px;
		height: 100px;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		z-index: 999;
		background-color: #FFFFFF;
	}
	.packet_list {
		position: relative;
		top: 290px;
	}
	.left_icon {
		position: fixed;
		width: 60rpx;
		top: 15px;
		padding: 0 6px;
	}
	.luck {
		background-color: #c59e5f;
		color: #FFFFFF;
		width: 35upx;
		height: 35upx;
		font-size: 20upx;
		margin-left: 10upx;
		border-radius: 3px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>