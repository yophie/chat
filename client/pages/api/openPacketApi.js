import {http} from './common.js'

export default {
	recievePacket(id, success) {
		http.post('api/packet/grap', {packetId: id}, function(res) {
			if (res.code == '10025') {
				uni.$emit('recievePacket', id)
				success()
			} else if (res.code == '10038') {
				uni.showToast({
					title: '您手慢了',
					duration: 2000
				})
				success()
			} else {
				uni.showModal({
				    title: '错误提示',
				    content: '系统错误，请稍后再试！'
				});
			}
		})
	}
}