import webSocketHandle from './webSocketHandle.js'
import {http, chatListTimeToString} from './common.js'

export default {
  chatList(data, result) {
	  data.list = []
	for (let chat of result) {
		let lastMessage = JSON.parse(chat.lastMessage)
		let lastContent = lastMessage.msgType == 2 ? '[红包]' : lastMessage.content
		let item = {
			id: chat.userGroupId,
			name: chat.userGroupName, 
			avatar: chat.userGroupAvatar,
			lastMsg: lastContent, 
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
	  	lastMsg: rd.msgType == 2 ? '[红包]' : rd.content, 
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
		  if (rd.chatType == 1) {
			  http.post('api/group/info', {groupId: item.id}, function(res) {
				  if (res.code == '10031') {
					  item.name = res.groupName
					  item.avatar = res.avatar
					  item.avatar = item.avatar ? item.avatar : '../../static/icon/default_avatar.png'
				  } else {
				  }
			  })
		  } else {
			  http.get('api/user/userinfo', {userId: item.id}, function(res) {
			  	if (res.code == '10003') {
			  		item.name = res.name
			  		item.avatar = res.avatar
			  		item.avatar = item.avatar ? item.avatar : '../../static/icon/default_avatar.png'
			  	} else {
			  	}
			  })
		  }
	  }
 	  
	  data.list.unshift(item)
  },
  getChatList(data) {
	  let that = this
	  http.get('api/chat/list', {}, function(res) {
		  console.log(res)
		  if (res.code == 10023) {
			  that.chatList(data, res.windows)
			  webSocketHandle.addListener(11, 'chatList', that.handleMsg, data)
		  } else {
			  uni.showModal({
			      title: '错误提示',
			      content: '系统错误，请稍后再试！'
			  });
		  }
	  })
	  uni.$on("changeGroupName", function(id, name) {
		  for (let i = 0; i < data.list.length; i++) {
			if (data.list[i].id == id) {
				data.list[i].name = name
				break
			}
		  }
	  })
	  
	  uni.$on("leaveGroup", function(id) {
	  	data.name = name + '(' + data.groupMemNum + ')'
		let index = 0
		for (let i = 0; i < data.list.length; i++) {
			if (data.list[i].id == id) {
				index = i
				break
			}
		}
		if (index > -1) {
			data.list.splice(index, 1); 
		}
	  }) 
  }
}
