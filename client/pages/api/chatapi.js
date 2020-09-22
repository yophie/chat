
export default {
  chatList (data) {
    let chatList = []
	for (let i = 1; i <= 20; i++) {
		chatList.push({id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png',lastMsg: '最后一条消息' + i, lastTime: this.timeToString('2020/09/18 12:37'), unread: i%3})
	}
	
    data.list = chatList
  },
  timeToString(time) {
	let now = new Date()
	let dateTime = new Date(time)
	
 	if (now.toDateString() === dateTime.toDateString()) {
		let hour = dateTime.getHours()
		let minute = dateTime.getMinutes()
		if (hour < 5) {
			return '凌晨' + hour + ':' + minute
		} else if (hour >= 5 && hour < 12) {
			return '上午' + hour + ':' + minute
		} else if (hour === 12) {
			return '中午' + hour + ':' + minute
		} else if (hour > 12 && hour < 19) {
			return '下午' + (hour - 12) + ':' + minute
		} else if (hour >= 19 && hour < 24) {
			return '晚上' + (hour - 12) + ':' + minute
		} 
	}
	
	let yesterday = new Date(now.getTime()-24*60*60*1000)
	
	if (yesterday.toDateString() === dateTime.toDateString()) {
		return '昨天'
	}	
	
	let nowWeekDay = now.getDay()
	let today = new Date(now.toLocaleDateString()).getTime()
	if (nowWeekDay == 0) nowWeekDay = 7
	if (today - (nowWeekDay - 1)*24*60*60*1000 < dateTime.getTime()) {
		let weekStr = ['日', '一', '二', '三', '四', '五', '六']
		return '周' + weekStr[dateTime.getDay()]
	}
	
	let year = dateTime.getFullYear()
	let nowYear = now.getFullYear()
	let dayNo = dateTime.getDate()
	let month = dateTime.getMonth() + 1

	if (nowYear != year) {
		return year + '年' + '' + month + '月' + dayNo + '日'
	} else {
		return month + '月' + dayNo + '日'
	}	
  }
}
