<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回" @clickLeft="BackPage"
			title="聊天设置" background-color="#e7ebed" :status-bar="true"></uni-nav-bar>
		<view class="bg-white imglist_row">
			<image class="imglist_item cu-avatar" v-for="item in memberList" :key="item.id" :src="item.avatar"></image>
			<image class="imglist_item" src="../../static/icon/invite.png" @click="invite"></image>
		</view>
		<uni-list v-if = "isGroup&isGroupOwner">
			<uni-list-item title="群聊名称" :rightText="name" :showArrow="true"
				:clickable="true" @click="popupChangeName"></uni-list-item>
		    <uni-list-item title="全员禁言"  
			:show-switch="true" :switchChecked="isForbidden"
					@switchChange="switchChange" ></uni-list-item>
		</uni-list>
		<view class="padding flex flex-direction">
		<button v-if="isGroup&isGroupOwner"  class="cu-btn bg-green lg" @click="disbanded">解散群</button>
		<button v-if="isGroup&!isGroupOwner" class="cu-btn bg-green lg" @click="leave" >删除并退出</button>
		</view>
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
				isGroupOwner: false,
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
				chatsettingapi.disbanded(this.id)
			},
			leave() {
				chatsettingapi.leave(this.id)
			},
			invite() {
				uni.navigateTo({
					url: '/pages/chat/newGroup?id=' + this.id 
				})
			}
		}
	}
</script>

<style>
	.imglist_row{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: 18upx;
	}
	.imglist_item{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width:100upx;
		height:100upx;
		margin: 20upx;
	}
</style>
