import {http} from './common.js'

export default {
  init (data) {
	http.post('api/user/info', {}, function(res) {
		if (res.code == '10003') {
			data.balance = res.money ? res.money : 0
			data.least = res.lowest
			data.rate = res.fee
		} else {
			uni.showModal({
			    title: '错误提示',
			    content: '系统错误，请稍后再试！'
			});
		}
	})
  },
  withdraw(amount, success) {
	  http.post('api/bill/cashout', {amount: amount}, function(res) {
		  if (res.code == '10035') {
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
