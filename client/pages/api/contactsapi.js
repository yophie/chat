import {http, tabbarreddot} from './common.js'

export default {
  contactList (data) {
	http.get('api/friend/list', {}, function(res) {
		if (res.code != '10027') {
			uni.showModal({
			    title: '错误提示',
			    content: '系统错误，请稍后再试！'
			});
		} else {
			for (let item of res.friends) {
				if (item.state == 2) {
					data.applyCount++
				} else if (item.state == 1) {
					let f = {
						id: item.id, 
						name: item.friendNick, 
						avatar: item.friendAvatar,
						status: item.state,
						friendId: item.friendId
					}
					f.avatar = f.avatar ? f.avatar : '../../static/icon/default_avatar.png'
					data.list.push(f)
				}
			}
			data.count = data.list.length
			uni.setStorageSync("requestNum", data.applyCount)
			tabbarreddot()
		}
	})
  }
}