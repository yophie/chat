<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回" @clickLeft="BackPage"
			title="发红包" background-color="#e7ebed" :status-bar="true"></uni-nav-bar>
			<text class="text-gray">当前余额{{balance}}元</text>
			<view class="send_packet">
				<view class="amount_input">
					<view>
						<text v-if="isGroup">总金额</text>
						<text v-else="isGroup">单个金额</text>
					</view>
					<input type="digit" v-model="amount" focus="true" style="font-size: 40upx;"
							placeholder="0.00" @input="input"/>元
				</view>
				<view v-if="isGroup">
					<text>当前为{{typeName[type]}}，<span class="text-yellow" @click="changeType">改为{{typeName[type ^ 1]}}</span>
					</text>
				</view>
				<view class="packet_num">
					红包个数<input type="number" v-model="packetNum" focus="true" style="font-size: 40upx;"
						placeholder="填写个数" @input="input"/>个
				</view>
				<view v-if="isGroup">
					<text>本群共{{memberNum}}人</text>
				</view>
			</view>
			<view class="amount_show">
				<text>{{toDecimal2(amount)}}</text>
			</view>
			<button type="primary" class="bg-green" @click="sendPacket" :disabled="disableSend">
				塞钱进红包
			</button>
		<uni-popup ref="popup" type="center">
		    <uni-popup-message :type="infoType" title="提示" :duration="2000" 
					:message="infoContent"  ></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import common from '@/pages/api/common.js'
	import sendPacketapi from '@/pages/api/sendPacketapi.js'
	import {uniNavBar, uniPopup,uniPopupMessage} from '@dcloudio/uni-ui'
	
	export default {
		name: 'sendPacket',
		components: {uniNavBar,uniPopup,uniPopupMessage},
		data() {
			let data = {
				amount: 0,
				packetNum: 0,
				balance: 0,
				chatId: 0,
				type: 0,
				memberNum: 0,
				isGroup: false,
				infoType: 'success',
				errorMsg: '',
				disableSend: true,
				infoContent: '',
				typeName: ['拼手气红包','普通红包']
			};
			sendPacketapi.init(data)
			return data
		},
		methods: {
			changeType() {
				this.type = this.type ^ 1
			},
			input() {
				this.disableSend = this.amount <= 0 || (this.isGroup) && this.packetNum <= 0
			},
			sendPacket() {
				sendPacketapi.sendPacket(this.$data)
			},
			BackPage() {
				common.BackPage()
			},
			toDecimal2(num) { 
				if (isNaN(parseFloat(num))) { 
					return false; 
				} 
				let f = Math.round(num*100)/100; 
				let s = f.toString(); 
				let rs = s.indexOf('.'); 
				if (rs < 0) { 
					rs = s.length; 
					s += '.'; 
				} 
				while (s.length <= rs + 2) { 
					s += '0'; 
				} 
				return s; 
			} 
		}
	}
</script>

<style>
	.send_packet {
		display: flex;
		flex-direction: column;
		
	}
	.amount_input {
		display: flex;
		flex-direction: row;
	}
	.packet_num {
		display: flex;
		flex-direction: row;
	}
	.amount_show {
		display: flex;
		justify-content: center;
		font-size: 100upx;
	}
</style>
