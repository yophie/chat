import {http, tabbarreddot} from './common.js'

export default {
  init (data) {
	http.post('api/user/info', {}, function(res) {
		if (res.code == '10003') {
			data.id = res.id
			data.name = res.name
			data.balance = res.money ? res.money : 0
			data.note = '账号：未设置'
			data.avatar = res.avatar
			data.avatar = data.avatar ? data.avatar : '../../static/icon/default_avatar.png'
		} else {
			uni.showModal({
			    title: '错误提示',
			    content: '系统错误，请稍后再试！'
			});
		}
		tabbarreddot()
	})
  }
}
