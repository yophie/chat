import Vue from 'vue'

export const http = {
	get(url,data,success) {
		this._request(url,data,success,'GET')
	},
	post(url,data,success) {
		this._request(url,data,success,'POST')
	},
	_request(url,data,success, method) {
		let request_url = 'services/' + url
		uni.showLoading({
			title: '加载中'
		})
		uni.request({
			url: request_url, 
			data: data,
			header: {
				'Authorization': uni.getStorageSync("token")
			},
			success: (res) => {
				if (res && res.data && res.data.code == '10010') {
					uni.setStorageSync("token", undefined)
					uni.navigateTo({
						url: '/pages/login'
					})
				} else if (res && res.data) {
					success(res.data)
				} else {
					uni.showModal({
					    title: '错误提示',
					    content: '系统错误，请稍后再试！'
					});
				}
			},
			fail: (res) => {
				uni.showModal({
				    title: '错误提示',
				    content: '系统错误，请稍后再试！'
				});
			},
			complete: () => {
				uni.hideLoading()
			},
			method: method
		});
	}
}
Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}

export const dateFormat = function (time) {
  let date = new Date(time)
  return date.format("yyyy年MM月dd hh:mm")
}

export default {
	BackPage() {
		if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
			let url = '/' + __wxConfig.pages[0]
			return uni.redirectTo({url})
		}
		uni.navigateBack({
			delta: 1
		});
	},
	fixed(num, accuracy) {
		if (isNaN(parseFloat(num))) {
			return -1; 
		}
		let numStr = num.toString()
		let index = numStr.indexOf('.')
		if (index == -1) {
			return Number(num)
		}
		if (!accuracy || accuracy <= 0) {
			return Number(numStr.slice(0, index))
		} else {
			return Number(numStr.slice(0, index + accuracy + 1))
		} 
	},
}

export const discoverTimeToString = function(time) {
  	let currentTime = Date.parse(new Date());
  	let dateTime = time;//后台传递来的时间
  	let d_day = Date.parse(new Date(dateTime));
  	let day = Math.abs(parseInt((d_day - currentTime)/1000/3600/24));//计算日期
  	let hour = Math.abs(parseInt((d_day - currentTime)/1000/3600));//计算小时
  	let minutes = Math.abs(parseInt((d_day - currentTime)/1000/60));//计算分钟
  	let seconds = Math.abs(parseInt((d_day - currentTime)/1000));//计算秒
  	if(day >= 2){
  		return day + "天前"
  	}else if(day > 0 && day < 2){
  		return "昨天"
  	}else if(hour > 0 && hour < 24){
  		return hour + "小时前"
  	}else if(minutes > 0 && minutes < 60){
  		return minutes + "分钟前"
  	}else if(seconds >= 0 && seconds < 60){
  		return '刚刚';
  	}
  }
  export const chatListTimeToString = function(time) {
	let now = new Date()
	let dateTime = new Date(time)
	
 	if (now.toDateString() === dateTime.toDateString()) {
		let hour = dateTime.getHours()
		let m = dateTime.getMinutes()
		let minute = m < 10 ? '0' + m : m
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
  
  export const getFromInfo = function(id, success) {
  	http.get('api/user/userinfo', {userId: id}, function(res) {
  		if (res.code == '10003') {
  			let item = {
  				name: res.name,
  				avatar: res.avatar
  			}
  			success(item)
  		} else {
  			
  		}
  	})
  }
 export const chatroomTimeToString = function(time) {
  	let now = new Date()
  	let dateTime = new Date(time)
  
  	let hour = dateTime.getHours()
	let m = dateTime.getMinutes()
  	let minute = m < 10 ? '0' + m : m 
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
  		return '昨天 ' + timeStr
  	}	
  
  	let nowWeekDay = now.getDay()
  	let today = new Date(now.toLocaleDateString()).getTime()
  	if (nowWeekDay == 0) nowWeekDay = 7
  	if (today - (nowWeekDay - 1)*24*60*60*1000 < dateTime.getTime()) {
  		let weekStr = ['日', '一', '二', '三', '四', '五', '六']
  		return '周' + weekStr[dateTime.getDay()] + ' ' + timeStr
  	}
  
  	let year = dateTime.getFullYear()
  	let nowYear = now.getFullYear()
  	let dayNo = dateTime.getDate()
  	let month = dateTime.getMonth() + 1
  
  	if (nowYear != year) {
  		return year + '年' + '' + month + '月' + dayNo + '日 ' + timeStr
  	} else {
  		return month + '月' + dayNo + '日 ' + timeStr
  	}	
  }