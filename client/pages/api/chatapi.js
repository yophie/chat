import webSocketHandle from './webSocketHandle.js'
import {http, chatListTimeToString} from './common.js'

export default {
  chatList(data, result) {
	  data.list = []
	for (let chat of result) {
		let lastMessage = JSON.parse(chat.lastMessage)
		let item = {
			id: chat.userGroupId,
			name: chat.userGroupName, 
			avatar: chat.userGroupAvatar,
			lastMsg: lastMessage.content, 
			lastTime: chatListTimeToString(chat.lastTime)
		}
		item.avatar = item.avatar ? item.avatar : '../../static/icon/default_avatar.png'
		data.list.push(item)
	}
  },
  handleMsg(data, result) {
	  if (!result || result.cmd != 11 || !result.data) {
		  return
	  }
	  let rd = result.data
	  let index = -1
	  let item = {
	  	id: rd.chatType == 1 ? rd.groupId : rd.chatId,
	  	lastMsg: rd.content, 
	  	lastTime: chatListTimeToString(rd.createTime),
		name: '',
		avatar: ''
	  }
	  for (let i = 0; i < data.list.length; i++) {
	  		if (data.list[i].id == item.id) {
				index = i
				item.name = data.list[i].name
				item.avatar = data.list[i].avatar
				item.avatar = item.avatar ? item.avatar : '@/static/icon/default_avatar.png'
				break
			}
	  }
	  if (index > -1) { 
	  	 data.list.splice(index, 1); 
	  } else {
		  http.post('api/user/userinfo', {userId: item.id}, function(res) {
		  	if (res.code == '10003') {
		  		item.name = res.name
		  		item.avatar = res.avatar
				item.avatar = item.avatar ? item.avatar : '@/static/icon/default_avatar.png'
		  	} else {
		  		
		  	}
		  })
	  }
 	  
	  data.list.unshift(item)
  },
  getChatList(data) {
	  let that = this
	  http.get('api/chat/list', {}, function(res) {
		  console.log(res)
		  if (res.code == 10023) {
			  that.chatList(data, res.windows)
		  } else {
			  uni.showModal({
			      title: '错误提示',
			      content: '系统错误，请稍后再试！'
			  });
		  }
	  })
	  webSocketHandle.addListener(11, 'chatList', this.handleMsg, data)
  }
}
