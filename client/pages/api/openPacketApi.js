import {http} from './common.js'

export default {
	recievePacket(id, success) {
		http.post('api/packet/grap', {packetId: id}, function(res) {
			if (res.code == '10025') {
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