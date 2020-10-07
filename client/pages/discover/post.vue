<template>
	<view>
		<uni-nav-bar fixed="true" left-icon="back" left-text="返回" @clickLeft="exit"
			title="发布朋友圈" background-color="#e9e9e9" :status-bar="true" :border="false">
			<view slot="right">
				<button class="cu-btn bg-green nm" :disabled="postDisabled"
						@click="post">发表</button>
			</view>
		</uni-nav-bar>
		<textarea placeholder="发点什么呢" v-model="content"
			class="bg-white" style="width: 100%;" maxlength="300" @input="input"></textarea>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog title="退出"
					content="确定放弃编辑内容并退出吗？"  @confirm="toDiscover"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupmsg" type="center">
		    <uni-popup-message title="提示" :duration="2000" 
					message="您还没有填写要发表的内容!"  ></uni-popup-message>
		</uni-popup>
	</view>	
</template>

<script>
	import postapi from '@/pages/api/postapi.js'
	import {uniNavBar,uniPopup,uniPopupDialog,uniPopupMessage} from '@dcloudio/uni-ui'
	export default {
		name: 'post',
		components: {uniNavBar,uniPopup,uniPopupDialog,uniPopupMessage},
		data() {
			return {
				content: '',
				postDisabled: true
			}
		},
		methods: {
			input() {
				if (this.content === '') {
					this.postDisabled = true
				} else {
					this.postDisabled = false
				}
			},
			post() {
				if (this.content === '') {
					this.$refs.popupmsg.open()
				} else {
					postapi.post(this.content)
					this.toDiscover()
				}
			},
			exit() {
				if (this.content != '') {
					this.$refs.popup.open()
				} else {
					this.toDiscover()
				}
			},
			toDiscover() {
				uni.switchTab({
					url: '/pages/discover/discover'
				})
			}
		}
	}
</script>

<style>
</style>
