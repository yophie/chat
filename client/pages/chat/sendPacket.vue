<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回" @clickLeft="BackPage"
			title="发红包" background-color="#f0f0f0" :status-bar="true" :border="false"></uni-nav-bar>
			<view class="send_packet">
				<text class="text-gray" style="margin-left: 20px;">当前余额{{balance}}元</text>
				<view class="amount_view">
					<view v-if="type == 0" class="prefix">
						<view class="luck">拼</view>
						<view>总金额</view>
					</view>
					<view v-else class="prefix">单个金额</view>
					<view class="amount_input">
						<input type="digit" v-model="amount" :focus="true"
							placeholder="0.00" @input="inputAmount" maxlength="10"/>
					</view>
					<view class="suffix">
						<text>元</text>
					</view>
				</view>
				<view style="display: inline-flex; justify-content: space-between;">
					<view v-if="isGroup"  style="margin-left: 20px; font-size: 25upx;">
						<text>当前为{{typeName[type]}}，<span class="text-yellow" @click="changeType">改为{{typeName[type ^ 1]}}</span>
						</text>
					</view>
					<view v-if="amount > balance" style="margin-left: 20px; margin-right: 20px;font-size: 25upx;">
						<text class="text-red">余额不足</text>
					</view>
				</view>
				<view v-if="isGroup" class="amount_view" style="margin-top: 30upx;">
					<view class="prefix">红包个数</view>
					<view class="amount_input">
						<input type="number" v-model="packetNum"
							placeholder="0" @input="inputPacketNum" maxlength="3"/>
					</view>
					<view class="suffix">
						<text>个</text>
					</view>
				</view>
				<view v-if="isGroup" class="text-gray" style="margin-left: 20px; font-size: 25upx;">
					<text>本群共{{memberNum}}人</text>
				</view>
			</view>
			<view class="amount_show">
				<text>{{amountShow}}</text>
			</view>
			<button type="default" class="send_button" @click="sendPacket" :disabled="disableSend">
				塞钱进红包
			</button>
	</view>
</template>

<script>
	import common from '@/pages/api/common.js'
	import sendPacketapi from '@/pages/api/sendPacketapi.js'
	import {uniNavBar, uniPopup,uniPopupMessage} from '@dcloudio/uni-ui'
	import amountInput from '@/pages/components/amountInput.vue'
	
	export default {
		name: 'sendPacket',
		components: {uniNavBar,uniPopup,uniPopupMessage, amountInput},
		data() {
			let data = {
				amount: '',
				packetNum: '',
				balance: 0,
				chatId: 0,
				type: 0,
				memberNum: 0,
				isGroup: false,
				disableSend: true,
				typeName: ['拼手气红包','普通红包']
			};
			sendPacketapi.init(data)
			return data
		},
		computed: {
			amountShow() {
				let f = common.fixed(this.amount, 2); 
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
			changeType() {
				this.type = this.type ^ 1
			},
			inputAmount() {
				this.$nextTick(function(){
					let n = common.fixed(this.amount, 2)
					this.amount = n >= 0 ? n : null
				})
				
				this.disableSend = this.amount > this.balance || this.amount <= 0 
									|| (this.isGroup && (this.packetNum <= 0 || this.packetNum > 100))
			},
			inputPacketNum() {
				this.$nextTick(function(){
					let n = common.fixed(this.packetNum, 0)
					this.packetNum = n >= 0 ? n : null
				})
				this.disableSend = this.amount > this.balance || this.amount <= 0
									|| (this.isGroup && (this.packetNum <= 0 || this.packetNum > 100))
			},
			sendPacket() {
				let param = {
					amount: this.amount,
					packetNum: this.packetNum,
					chatId: this.chatId,
					type: this.type
				}
				sendPacketapi.sendPacket(param)
				this.BackPage()
			},
			BackPage() {
				common.BackPage()
			}
		}
	}
</script>

<style scoped>
	.send_packet {
		display: flex;
		flex-direction: column;
		margin-top: 30upx;
	}
	.send_button {
		width: 320upx;
		font-size: 25upx;
		background-color: #fe3d23;
	}
	.packet_num {
		display: inline-flex;
		justify-content: space-between;
	}
	.amount_show {
		display: flex;
		justify-content: center;
		font-size: 100upx;
		margin-top: 50upx;
		margin-bottom: 50upx;
	}
	.amount_view {
		display: inline-flex;
		background-color: #FFFFFF;
		margin-left: 15px;
		margin-right: 15px;
		border-radius: 4px;
		min-height: 50px;
		border: none;
		align-items: center;
	}
	.amount_input {
		width: 100%;
		border: none;
		font-size: 27upx;
		margin-right: 15upx;
		text-align: right;
	}
	.suffix {
		width: 50upx;
		font-size: 30upx;
		margin-right: 25upx;
	}
	.prefix {
		width: 230upx;
		font-size: 30upx;
		margin-left: 25upx;
		align-items: center;
		display: inline-flex;
	}
	.luck {
		background-color: #c59e5f;
		color: #FFFFFF;
		width: 35upx;
		height: 35upx;
		font-size: 20upx;
		margin-right: 10upx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>
