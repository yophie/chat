import {http} from './common.js'

export default {
	packetInit(data, packetId) {
		http.post('api/packet/state', {packetId: packetId}, function(res) {
			if (res.code == '10025') {
				data.canRecive = (data.isGroup && res.state <= 0 && res.surplus > 0) ||
				(!data.isGroup && res.sender == uni.getStorageSync("userId")) ||
				 (!data.isGroup && res.sender != uni.getStorageSync("userId") && res.state <= 0 && res.surplus > 0) 
			} 
		})
	},
	openPacket(data, packetId, success) {
		http.post('api/packet/state', {packetId: packetId}, function(res) {
			if (res.code == '10025') {
				success(res)
			} 
		})
	}
}