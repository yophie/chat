import {http} from './common.js'

export default {
  requestList (data) {
	http.get('api/friend/list', {}, function(res) {
		if (res.code == '10027') {
			for (let item of res.friends) {
				let f = {
					id: item.id, 
					name: item.friendNick, 
					avatar: item.friendAvatar,
					msg: '我是' + item.friendNick, 
					status: item.state,
					friendId: item.friendId
				}
				f.avatar = f.avatar ? f.avatar : '../../static/icon/default_avatar.png'
				data.list.push(f)
			}
		} else {
			uni.showModal({
			    title: '错误提示',
			    content: '系统错误，请稍后再试！'
			});
		}
	})
  },
  accept(request) {
	  http.get('api/friend/answer', {applyUser: request.friendId, state: 1}, function(res) {
		  if (res.code == '10029') {
			  request.status = 1
			  uni.$emit("request", -1)
		  } else {
			uni.showModal({
			    title: '错误提示',
			    content: '系统错误，请稍后再试！'
			});
		}
	  })
  },
  reject(request) {
	  http.get('api/friend/answer', {applyUser: request.friendId, state: 3}, function(res) {
		  if (res.code == '10029') {
		  	  request.status = 3
			  uni.$emit("request", -1)
		    } else {
		  	uni.showModal({
		  	    title: '错误提示',
		  	    content: '系统错误，请稍后再试！'
		  	});
		  }
	  })
  },
}

