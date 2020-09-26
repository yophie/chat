<template>
	<view>
		<!-- <view class="cpt-mask"/> -->
		<view class="packet">
			<view class="header_part">
				<view style="display: inline-flex;align-items: center;">
					<image :src="senderAvatar" style="width: 40upx; height: 40upx;"></image>
					<view>
						<text class="text-gold" style="font-weight: bold; font-size: 25upx">{{senderNick}}的红包</text>
					</view>	
				</view>
				<view class="text-gold" style="font-size: 40upx; margin-top: 10px;">恭喜发财，大吉大利</view>
			</view>
			<view class="middle_part"/>
			<view class="bottom_part" >
				<view :animation="animationData" class="open_button" @click="open">開</view>
			</view>
		</view>
		<view class="close_area">
			<uni-icons type="close" color="#ffcc9d" size="35" @click="close"
					></uni-icons>
		</view>
	</view>

</template>

<script>
	import {uniIcons} from '@dcloudio/uni-ui'
	import openPacketApi from '@/pages/api/openPacketApi.js'
	
	export default {
		name: 'openPacket',
		components: {uniIcons},
		props: {
			id: {
				type: Number,
				default: 0
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
				animation: null,
				animationData: {}
			}
		},
		mounted() {
			let animation = uni.createAnimation({
			    duration: 1000,
				timingFunction: 'linear',
			})
			this.animation = animation
		},
		methods: {
			open() {
				this.animation.rotateY(180).step()
				this.animationData = this.animation.export()
				openPacketApi.recievePacket(this.id)
				
				let that = this
				setTimeout(function() {
					that.$emit('open', {id: that.id})
				},1100)
				
			},
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style scoped>
	.cpt-mask {
		position: fixed;  
		top: 0;  
		left: 0;  
		width: 100%;  
		height: 100%;  
		background-color: #FFFFFF;
		opacity: 0.1;  
		z-index: 99; 
	}  
	.packet {
		display: inline-flexbox;
		top: 120upx;
		width: 550upx;
		height: 800upx;
		z-index: 100;
		background-color: #ee3d31;
	}
	.header_part {
		height: 60%;
		background-color: #ed483e;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.text-gold {
		color: #ffcc9d;
	}
	.middle_part {
		width: 100%;
		height: 15%;
		border-radius: 100% 100% 100% 100% / 0% 0% 150% 150%;
		border-bottom: 1px solid;
		background-color: #ed483e;
	}
	.bottom_part {
		display: flex;
		justify-content: center;
	}
	.open_button {
		position:absolute;
		top: 550upx;
		width: 100upx;
		height: 100upx;
		border-radius: 100% 100% 100% 100%;
		background-color: #e6c487;
		font-size: 50upx;
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
	.close_area {
		width: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin-top: 30upx;
	}
</style>
