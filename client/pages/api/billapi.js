import {http, dateFormat} from './common.js'

export default {
  billList (data) {
    http.get('api/bill/list', {},function(res) {
		if (res.code != '10035') {
			uni.showModal({
			    title: '错误提示',
			    content: '系统错误，请稍后再试！'
			});
		} else {
			data.list = res.billList.list
			for (let item of data.list) {
				switch(item.type) {
					case 0: 
					item.title = '红包-发给' + item.userName,
					item.avatar = '../../static/icon/bill_packet.png'
					break;
					case 1: 
					item.title = '红包-来自' + item.userName,
					item.avatar = '../../static/icon/bill_packet.png'
					break;
					case 3: 
					item.title = '提现' + item.userName,
					item.avatar = '../../static/icon/bill_cashout.png'
					break;
				}
				item.timeStr = dateFormat(item.applyTime)
			}
		}
    })
  }
}
