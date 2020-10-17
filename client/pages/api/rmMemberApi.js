import {http} from './common.js'

export default {
  init (data) {
	http.post('api/group/info', {groupId: data.id} , function(res) {
		if (res.code != '10031') {
			uni.showModal({
				title: '错误提示',
				content: '系统错误，请稍后再试！'
			});
		} else {
			for (let m of res.members) {
				if (m.myId == uni.getStorageSync("userId")) {
					continue
				}
				let item = {
					id: m.myId, 
					name: m.myName, 
					avatar: m.myAvatar,
					checked: false
				}
				item.avatar = item.avatar ? item.avatar : '../../static/icon/default_avatar.png'
				data.list.push(item)
			}
		}
	})
  },
  remove(groupId, selectedList) {
	  http.post('api/group/kick', {groupId: groupId, friends: selectedList}, function(res) {
		  if (res.code == '10031') {
			  uni.navigateTo({
				url: '/pages/chat/chatroom?id=' + groupId
			  })
		  } else {
			  uni.showModal({
				  title: '错误提示',
				  content: '系统错误，请稍后再试！'
			  });
		  }
	  })
	  
  }
}