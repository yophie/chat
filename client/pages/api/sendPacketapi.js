import {http} from './common.js'
import webSocketHandle from './webSocketHandle.js'

export default {
  init (data) {
	http.post('api/user/info', {}, function(res) {
		if (res.code == '10003') {
			data.balance = res.money > 0 ? res.money : 0
		} else {
			uni.showModal({
			    title: '错误提示',
			    content: '系统错误，请稍后再试！'
			});
		}
	})
  },
  sendPacket(param) {
	  webSocketHandle.sendMessage({
		  cmd: 11,
		  from: uni.getStorageSync("userId"),
		  to: param.isGroup ? undefined : param.chatId,
		  groupId: param.isGroup ? param.chatId : undefined,
		  chatType: param.isGroup ? 1 : 2,
		  msgType: 2,
		  packetType: param.type,
		  packetAmount: param.amount,
		  packetNum: param.packetNum > 0 ? param.packetNum : 1
	  })
  }
}
