<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回"  @clickLeft="BackPage"
				title="添加朋友" background-color="#e9e9e9" :status-bar="true" :border="false"></uni-nav-bar>
		<uni-search-bar placeholder="请输入手机号" @confirm="search" v-model="keyword"></uni-search-bar>
		
		<uni-list :border="true">
			<uni-list-item v-for="item in list" :key="item.id" 
				:title="item.name" :thumb="item.avatar" >
				<view class="uni-list-item__content-extra" slot="footer">
					<view v-if="item.status === 0" >
						<button class="cu-btn text-green sm" @click="request(item.id)">添加</button>
					</view>
					<view v-else>
						<text v-if="item.status === 1">
							待验证
						</text>
						<text v-if="item.status === 2">
							已添加
						</text>
					</view>
				</view>
			</uni-list-item>
		</uni-list>
		<view v-if="list.length == 0 && afterSearch" class="text-box">
			<text>没有找到用户！</text>
		</view>
	</view>
</template>

<script>
	import requestapi from '@/pages/api/requestapi.js'
	import {uniList,uniListItem,uniListChat,uniNavBar,uniSearchBar} from '@dcloudio/uni-ui'
	import common from '../api/common.js'
	
	export default {
		name: 'request',
		components: {uniList,uniListItem,uniListChat,uniNavBar,uniSearchBar},
		data() {
			return {
				list: [],
				afterSearch: false,
				keyword: ''
			}
		},
		methods: {
			BackPage() {
				common.BackPage()
			},
			search() {
				requestapi.search(this.$data)
				this.afterSearch = true
			},
			request(id) {
				requestapi.request(id, function() {
				})
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
		height: 100rpx;
		background-color: #FFFFFF;
		overflow: hidden;
	}
	.right-content {
		/* #ifndef APP-NVUE */
		display: flex;
		align-content: center;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap-reverse;
		overflow: hidden;
	}
	.uni-list-item__content-extra {
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		margin-left: 5px;
		font-size: $uni-font-size-sm;
	}
</style>
