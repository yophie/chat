<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回" @clickLeft="BackPage"
			title="提现" background-color="#e9e9e9" :status-bar="true" :border="false"></uni-nav-bar>
		<uni-card title="提现金额">
			<text class="text-gray">当前余额{{balance}}元</text>
			<view class="amount">
			￥<input type="digit" v-model="amount" focus="true" style="font-size: 40upx;"
			 @input="input" placeholder="0.00"/>
			 </view>
			<view class="withdraw_message">
				<view>
					<text class="text-gray">最低可提现{{least}}元，提现手续费{{rate*100}}%</text>
				</view>
				<view>
					<text class="text-gray">提现实际到账{{actualAmount}}元</text>
				</view>
				<view v-if="errorMsg">
					<text class="text-red">{{errorMsg}}</text>
				</view>
			</view>
			<button type="default" class="button" @click="withdraw" :disabled="disableWithdraw">提现</button>
		</uni-card>
		<uni-popup ref="popup" type="center">
		    <uni-popup-message :type="infoType" title="提示" :duration="2000" 
					:message="infoContent"  ></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import common from '@/pages/api/common.js'
	import withdrawapi from '@/pages/api/withdrawapi.js'
	import {uniNavBar, uniCard, uniPopup,uniPopupMessage} from '@dcloudio/uni-ui'
	
	export default {
		name: 'bill',
		components: {uniNavBar,uniCard, uniPopup,uniPopupMessage},
		data() {
			let data = {
				rate: 0,
				least: 0,
				amount: null,
				balance: 0,
				errorMsg: '',
				disableWithdraw: true,
				infoContent: '',
				infoType: 'success'
			};
			return data
		},
		onShow() {
			withdrawapi.init(this.$data)
		},
 		computed: {
			actualAmount() {
				return Math.round(this.amount*(1-this.rate)*100)/100
			}
		},
		methods: {
			BackPage() {
				common.BackPage()
			},
			input() {
				this.$nextTick(function(){
					let n = common.fixed(this.amount, 2)
					this.amount = n >= 0 ? n : null
					if (this.amount < this.least) {
						this.errorMsg = '提现金额不能少于' + this.least + '元'
						this.disableWithdraw = true
					} else if (this.amount > this.balance) {
						this.errorMsg = '余额不足'
						this.disableWithdraw = true
					} else {
						this.errorMsg = ''
						this.disableWithdraw = false
					}
				})
			},
			withdraw() {
				if (this.amount >= this.least && this.amount <= this.balance) {
					let that = this
					withdrawapi.withdraw(this.amount, function(){
						that.infoContent = '成功提现' + that.amount + '元'
						that.amount = null
						that.disableWithdraw = true
						that.$refs.popup.open()
						withdrawapi.init(that.$data)
					});
				}
			}
		}
	}
</script>

<style scoped>
	.amount {
		display: flex; 
		font-size: 40upx; 
		margin-top: 10px;
	}
	.withdraw_message {
		margin-top: 10px; 
		margin-bottom: 20px;
	}
	.button {
		background-color: #19b851;
	}
</style>