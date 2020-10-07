import {http} from './common.js'

export default {
  contactList (data) {
	http.get('api/friend/list', {state: 1}, function(res) {
		if (res.code != '10027') {
			uni.showModal({
			    title: '错误提示',
			    content: '系统错误，请稍后再试！'
			});
		} else {
			for (let item of res.friends) {
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
			data.count = data.list.length
		}
	})
  }
}