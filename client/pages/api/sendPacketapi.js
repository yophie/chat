
export default {
  init (data) {
	data.balance = 100
	data.chatId = 12
	data.type = 0
	data.memberNum = 3
	data.isGroup = true
  },
  sendPacket(data) {
	  console.log(data)
  }
}
