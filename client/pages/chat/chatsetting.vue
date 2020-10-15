<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回" @clickLeft="BackPage"
			title="聊天设置" background-color="#e9e9e9" :status-bar="true" :border="false"></uni-nav-bar>
		<view class="bg-white imglist_row">
			<view v-for="item in memberList" :key="item.id" class="imglist_item">
				<image class="cu-avatar"  :src="item.avatar" style="width:80upx;
		height:80upx;"></image>
				<text style="font-size: 20upx;">{{item.name}}</text>
			</view>
			<view>
				<image class="img_plus" src="../../static/icon/invite.png" @click="invite"></image>
				<image class="img_plus" src="../../static/icon/remove.png" @click="remove"></image>
			</view>
		</view>
		<uni-list v-if = "isGroup&isGroupOwner">
			<uni-list-item title="群聊名称" :rightText="name" :showArrow="true"
				:clickable="true" @click="popupChangeName"></uni-list-item>
		    <uni-list-item title="全员禁言"  
			:show-switch="true" :switchChecked="isForbidden"
					@switchChange="switchChange" ></uni-list-item>
		</uni-list>
		<!-- <view class="padding flex flex-direction">
		<button v-if="isGroup&isGroupOwner"  class="cu-btn bg-green lg" @click="disbanded">解散群</button>
		<button v-if="isGroup&!isGroupOwner" class="cu-btn bg-green lg" @click="leave" >删除并退出</button>
		</view> -->
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog mode="input" title="修改群聊名称" :duration="2000" 
					:value="name"  @confirm="changeGroupName"></uni-popup-dialog>
		</uni-popup>
	</view>
	
</template>

<script>
	import common from '../api/common.js'
	import chatsettingapi from '@/pages/api/chatsettingapi.js'
	import {uniList,uniListItem,uniNavBar,uniPopup,uniPopupDialog} from '@dcloudio/uni-ui'
	
	export default {
		name: 'chatsetting',
	    components: {uniList,uniListItem,uniNavBar,uniPopup,uniPopupDialog},
		data() {
			let data = {
				id: 0,
				name: '',
				isGroup: true,
				isGroupOwner: true,
				isForbidden: false,
				memberList: []
			}
			return data
		},
		onLoad(options) {
			this.id = options.id
			chatsettingapi.init(this.$data)
		},
		methods: {
			switchChange(e) {
				this.isForbidden = !this.isForbidden
				chatsettingapi.changeForbidden(this.id, this.isForbidden)
			},
			BackPage() {
				common.BackPage()
			},
			changeGroupName(done, value) {
				chatsettingapi.changeGroupName(this.$data, value)
				done()
			},
			popupChangeName() {
				this.$refs.popup.open()
			},
			disbanded() {
				let that = this
				uni.showModal({
				    title: '提示',
				    content: '解散群后，将删除群组所有成员历史消息并不再接收新消息',
				    success: function (res) {
				        if (res.confirm) {
							chatsettingapi.disbanded(that.id)
				        } else if (res.cancel) {
				        }
				    }
				});
			},
			leave() {
				let that = this
				uni.showModal({
				    title: '提示',
				    content: '退出群后，将删除该群历史消息并不再接收新消息',
				    success: function (res) {
				        if (res.confirm) {
							chatsettingapi.leave(that.id)
				        } else if (res.cancel) {
				        }
				    }
				});
			},
			invite() {
				uni.navigateTo({
					url: '/pages/chat/newGroup?id=' + this.id 
				})
			},
			remove() {
				uni.navigateTo({
					url: '/pages/chat/rmMember?id=' + this.id 
				})
			}
		}
	}
</script>

<style>
	.imglist_row {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 18upx;
	}
	.imglist_item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 20upx;
	}
	.img_plus {
		width:90upx;
		height:90upx; 
		margin: 20upx;
		margin-bottom: 30upx;
	}
</style>
