<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回"  @clickLeft="BackPage"
				:title="title" background-color="#e9e9e9" :status-bar="true" :border="false">
				<view slot="right">
					<button class="cu-btn bg-green nm" :disabled="createDisabled"
							@click="create">完成</button>
				</view>
		</uni-nav-bar>
		<uni-popup ref="popup" type="center">
		    <uni-popup-message type="info" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-list :border="true">
			<uni-list-item v-for="friend in list" :key="friend.id" thumb='placeholder'
				:title="friend.name" :clickable="!friend.inGroup" @click="checked(friend)">
				<view slot="header">
					<view class="uni-list-item__header">
						<view class="uni-list-item__header__selected">
							<span class="iconfont "
							:class="friend.checked || friend.inGroup ? 'iconselected' : 'iconselect'" 
							:style="{color: friend.checked || friend.inGroup ? (friend.inGroup ? '#c2c0c4' : '#007aff') : '#aaa'}" 
							style="font-size: 35rpx;"></span>
						</view>
						<view class="uni-list-item__icon">
							<image :src="friend.avatar" class="uni-list-item__icon-img"/>
						</view>
					</view>
				</view>
			</uni-list-item>
		</uni-list>
		<view v-if="list.length === 0" class="text-box">
			<text>还没有好友！</text>
		</view>
	</view>
</template>

<script>
	import newGroupapi from '@/pages/api/newGroupapi.js'
	import {uniNavBar,uniListItem,uniList,uniPopup,uniPopupMessage,uniIcons} from '@dcloudio/uni-ui'
	import common from '../api/common.js'
	
	export default {
		name: 'newGroup',
		components: {uniNavBar,uniListItem,uniList,uniPopup,uniPopupMessage,uniIcons},
		data() {
			let data = {
				id: 0,
				list: [],
				selectedList: [],
				selectedListName: [],
				message: '',
				createDisabled: true
			}
			return data
		},
		onLoad(options) {
			if (options.id > 0)
				this.id = options.id
			newGroupapi.init(this.$data)
		},
		computed: {
			title() {
				return this.id > 0 ? '邀请好友' : '发起群聊'
			}
		},
		methods: {
			BackPage() {
				common.BackPage()
			},
			checked(friend) {
				friend.checked = !friend.checked
				if (friend.checked) {
					this.selectedList.push(friend.friendId)
					this.selectedListName.push(friend.name)
				}	
				else {
					for (let i = 0; i < this.selectedList.length; i++) {
					    if (this.selectedList[i] === friend.friendId) {
					      this.selectedList.splice(i, 1)
						  this.selectedListName.splice(i, 1)
						  i--
					    }
					}
				}
				if (this.id > 0 && this.selectedList.length < 1) {
					this.createDisabled = true
				} else if (this.id == 0 && this.selectedList.length <= 1) {
					this.createDisabled = true
				} else {
					this.createDisabled = false
				}
			},
			create() {
				if (this.id > 0 && this.selectedList.length < 1) {
					this.message = '至少选择一位朋友'
					this.$refs.popup.open()
					return
				}
				if (this.id == 0 && this.selectedList.length <= 1) {
					this.message = '至少选择两位朋友'
					this.$refs.popup.open()
					return
				}
				newGroupapi.create(this.id, this.selectedListName, this.selectedList)
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
