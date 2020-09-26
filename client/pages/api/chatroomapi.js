export default {
  chatroominit (data) {
	let id = data.id
	data.name = "昵称后台获取"
	data.isGroup = id%4 == 0
	data.isGroupOwner = id%8 == 0
    let msgList = []
	let lastShowTime = 0
	for (let i = 1; i <= 20; i++) {
		let message = {
			type: i%3, // 0 text 1 forbidden 2 packet 3 image 4 sound 5 time 6 system
			senderAvatar: '/static/icon/avatar.png',
			id: i,
			senderId: i,
			senderNick: '发红包' + i,
			content: '测试测试测试测试',
			isSelf: i%2 === 0,
			isRemain: true
		}
		let time = new Date('2020/09/20 18:20').getTime()
		if (lastShowTime + 5*60*1000 < time) {
			msgList.push({
				type: 5,
				content: this.timeToString(time),
				id: 't' + i
			})
			lastShowTime = time
		}
		msgList.push(message)
	}
	data.lastShowTime = lastShowTime
    data.msgList = msgList
  },
	sendMessage(data) {
		if (data.sendMsg) {
			let msg = data.sendMsg
			if (data.socketOpen) {
				uni.sendSocketMessage({
					data: {fromid: 1, toid: data.id, message: msg}
				});
			} else {
			// socketMsgQueue.push(msg);
			}
			let id = data.maxID++
			let message = {
				type: 0,
				senderAvatar: '/static/icon/avatar.png',
				id: id,
				sendderId: id,
				content: msg,
				time: new Date().toDateString(),
				isSelf: true
			}
			let time = new Date().getTime()
			if (data.lastShowTime + 5*60*1000 < time) {
				data.msgList.push({
					type: 5,
					content: this.timeToString(time),
					id: 't' + id
				})
				data.lastShowTime = time
			}
			data.msgList.push(message)
			data.sendMsg = ''
			data.sendText = false
		} 
	},
	timeToString(time) {
		let now = new Date()
		let dateTime = new Date(time)

		let hour = dateTime.getHours()
		let minute = dateTime.getMinutes()
		let timeStr = ''
		if (hour < 5) {
			timeStr = '凌晨' + hour + ':' + minute
		} else if (hour >= 5 && hour < 12) {
			timeStr = '上午' + hour + ':' + minute
		} else if (hour === 12) {
			timeStr = '中午' + hour + ':' + minute
		} else if (hour > 12 && hour < 19) {
			timeStr = '下午' + (hour - 12) + ':' + minute
		} else if (hour >= 19 && hour < 24) {
			timeStr = '晚上' + (hour - 12) + ':' + minute
		} 
		if (now.toDateString() === dateTime.toDateString()) {
			return timeStr
		}

		let yesterday = new Date(now.getTime()-24*60*60*1000)

		if (yesterday.toDateString() === dateTime.toDateString()) {
			return '昨天' + timeStr
		}	

		let nowWeekDay = now.getDay()
		let today = new Date(now.toLocaleDateString()).getTime()
		if (nowWeekDay == 0) nowWeekDay = 7
		if (today - (nowWeekDay - 1)*24*60*60*1000 < dateTime.getTime()) {
			let weekStr = ['日', '一', '二', '三', '四', '五', '六']
			return '周' + weekStr[dateTime.getDay()] + timeStr
		}

		let year = dateTime.getFullYear()
		let nowYear = now.getFullYear()
		let dayNo = dateTime.getDate()
		let month = dateTime.getMonth() + 1

		if (nowYear != year) {
			return year + '年' + '' + month + '月' + dayNo + '日' + timeStr
		} else {
			return month + '月' + dayNo + '日' + timeStr
		}	
	}

}
