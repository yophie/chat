import {http, dateFormat} from './common.js'

export default{
	init(id, data) {
		http.post('api/packet/list', {packetId: id}, function(res) {
			if (res.code == '10025') {
				for (let draw of res.drawList) {
					let item = {
						reciever: draw.reciever,
						avatar: draw.recieverAvatar,
						name: draw.recieverName,
						recieveTime: dateFormat(draw.time),
						amount: '' + draw.amount
					}
					item.avatar = item.avatar ? item.avatar : '../../static/icon/default_avatar.png'
					data.list.push(item)
					data.recievedNum++
					data.recievedAmount += draw.amount
				}
				data.senderAvatar = res.senderAvatar
				data.senderAvatar = data.senderAvatar ? data.senderAvatar : '../../static/icon/default_avatar.png'
				data.senderNick = res.senderName
				data.packetNum = res.num
				data.totalAmount = res.amount
				data.isRemain = data.recievedNum < res.num
				data.isSender = uni.getStorageSync('userId') == res.sender
				data.packetType = res.type
				if (!data.isGroup && res.type == 0) {
					data.packetType = 3
				}
				data.recieveAmount = res.queryAmount
			} else {
				uni.showModal({
				    title: '错误提示',
				    content: '系统错误，请稍后再试！'
				});
			}
		})
	}
}