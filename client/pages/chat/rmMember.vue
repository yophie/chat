<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回"  @clickLeft="BackPage"
				:title="title" background-color="#e9e9e9" :status-bar="true" :border="false">
				<view slot="right">
					<button class="cu-btn bg-red nm" style="white-space:nowrap;" :disabled="rmDisabled"
							@click="remove">删除({{selectedList.length}})</button>
				</view>
		</uni-nav-bar>
		<uni-popup ref="popup" type="center">
		    <uni-popup-message type="info" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-list :border="true">
			<uni-list-item v-for="friend in list" :key="friend.id" thumb='placeholder'
				:title="friend.name" :clickable="true" @click="checked(friend)">
				<view slot="header">
					<view class="uni-list-item__header">
						<view class="uni-list-item__header__selected">
							<span class="iconfont "
							:class="friend.checked ? 'iconselected' : 'iconselect'" 
							:style="{color: friend.checked ? '#19b84f' : '#aaa'}" 
							style="font-size: 35rpx;"></span>
						</view>
						<view class="uni-list-item__icon">
							<image :src="friend.avatar" class="uni-list-item__icon-img"/>
						</view>
					</view>
				</view>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import rmMemberApi from '@/pages/api/rmMemberApi.js'
	import {uniNavBar,uniListItem,uniList,uniPopup,uniPopupMessage,uniIcons} from '@dcloudio/uni-ui'
	import common from '../api/common.js'
	
	export default {
		name: 'rmMember',
		components: {uniNavBar,uniListItem,uniList,uniPopup,uniPopupMessage,uniIcons},
		data() {
			let data = {
				id: 0,
				list: [],
				selectedList: [],
				message: '',
				rmDisabled: true
			}
			return data
		},
		onLoad(options) {
			if (options.id > 0)
				this.id = options.id
			rmMemberApi.init(this.$data)
		},
		computed: {
			title() {
				return '聊天成员(' + this.list.length + ')'
			}
		},
		methods: {
			BackPage() {
				common.BackPage()
			},
			checked(friend) {
				friend.checked = !friend.checked
				if (friend.checked) {
					this.selectedList.push(friend.id)
				} else {
					let index = 0
					for (let i = 0; i < this.selectedList.length; i++) {
					    if (this.selectedList[i] === friend.friendId) {
					      index = i
						  continue
					    }
					}
					this.selectedList.splice(index, 1)
				}
				if (this.selectedList.length < 1) {
					this.rmDisabled = true
				} else {
					this.rmDisabled = false
				}
			},
			remove() {
				if (this.selectedList.length < 1) {
					this.message = '至少选择一位成员'
					this.$refs.popup.open()
					return
				}
				rmMemberApi.remove(this.id, this.selectedList)
			}
		}
	}
</script>

<style lang="scss">
	.uni-list-item__header__selected {
		/* #ifndef APP-NVUE */
		display: flex;
		align-content: center;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap-reverse;
		overflow: hidden;
		margin-right: 18rpx;
	}
	.uni-list-item__header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}
	.uni-list-item__icon {
		margin-right: 18rpx;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.uni-list-item__icon-img {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		height: 68rpx;
		width: 68rpx;
	}
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
</style>
