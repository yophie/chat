import {http} from './common.js'

export default {
  groupchatList (data) {
	http.get('api/friend/group', {}, function(res) {
		if (res.code != '10027') {
			uni.showModal({
			    title: '错误提示',
			    content: '系统错误，请稍后再试！'
			});
		} else {
			for(let g of res.groups) {
				let item = {
					id: g.groupId,
					name: g.groupName,
					avatar: g.avatar 
				}
				item.avatar = item.avatar ? item.avatar : '../../static/icon/default_avatar.png'
				data.list.push(item)
			}
		}
	})
  }
}

