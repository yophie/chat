export default{
	init(id, data) {
		console.log("open packet " + id)
		data.senderAvatar = '/static/icon/avatar.png'
		data.senderNick = '发红包人'
		data.packetNum = 1
		data.totalAmount = 10
		data.recieveAmount = 1
		data.isRemain = true
		data.isSender = true
		data.packetType = 0
		let list = []
		for (let i = 0; i < 5; i++) {
			let item = {
				id: i,
				avatar: '/static/icon/avatar.png',
				name: '昵称' + i,
				recieveTime: '2020-08-10 14:20',
				amount: 10 + ''
			};
			list.push(item)
		}
		data.list = list
	}
}