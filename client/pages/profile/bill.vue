<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回" @clickLeft="BackPage"
			title="账单" background-color="#e9e9e9" :status-bar="true" :border="false"></uni-nav-bar>
		<uni-list :border="true">
			<uni-list-item v-for="item in list" :key="item.id"
				:title="item.title" :thumb="item.avatar" :note="item.timeStr" thumb-size="base" >
				<view slot="footer" class="uni-list-item__extra">
					<text class="uni-list-item__extra-text"
						:class="item.amount > 0 ? 'text-brown' : 'text-black'">
						{{(item.amount > 0 ? '+' : '') + item.amount}}元
					</text>
				</view>
			</uni-list-item>
		</uni-list>
		<view v-if="list.length == 0" class="text-box">
			<text>还没有账单！</text>
		</view>
	</view>
</template>

<script>
	import common from '@/pages/api/common.js'
	import billapi from '@/pages/api/billapi.js'
	import {uniNavBar, uniList,uniListItem,uniListChat} from '@dcloudio/uni-ui'
	
	export default {
		name: 'bill',
		components: {uniList,uniListItem,uniListChat,uniNavBar},
		data() {
			let data = {
				list: []
			};
			return data;
		},
		onShow() {
			billapi.billList(this.$data);
		},
		methods: {
			BackPage() {
				common.BackPage()
			}
		}
	}
</script>

<style lang="scss">
	.text-box {
		/* #ifndef APP-NVUE */
		display: flex;
		align-content: center;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap-reverse;
		overflow: hidden;
		padding-top: 300upx; 
	}
	.uni-list-item__extra {
		// width: 25%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	.uni-list-item__extra-text {
		font-size: $uni-font-size-base;
	}
</style>
