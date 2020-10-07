import webSocketHandle from './webSocketHandle.js'
import {http,chatroomTimeToString,getFromInfo} from './common.js'
let v
export default {
  chatroominit (data, v1, success) {
	  v = v1
	  let that = this
	  http.get('api/user/type', {id: data.id}, function(res) {
		  if (res.code == '10003') {
			  data.isGroup = res.userType == 1
			  data.isGroupOwner = res.isOwner
			  data.name = res.name + (res.userType == 1 ? '(' + res.groupMemberNum + ')' : ''),
			  data.groupMemNum = res.groupMemberNum
			  if (!data.isGroup) {
				  getFromInfo(data.id, function(fromInfo) {
					  data.friendAvatar =  fromInfo ? fromInfo.avatar : ''
					  data.friendName = fromInfo ? fromInfo.name : '',
					  that.chatMsgInit(data)
				  })
			  } else {
				  that.chatMsgInit(data)
			  }
		  } else {
			  uni.showModal({
				  title: '错误提示',
				  content: '系统错误，请稍后再试！'
			  });
		  }
	  })
  },
  chatMsgInit(data) {
	  webSocketHandle.sendMessage({
	  		  cmd:19, 
	  		  type:1,
	  		  userId: uni.getStorageSync("userId"),
	  		  fromUserId: data.isGroup ? undefined : data.id,
	  		  groupId: data.isGroup ? data.id : undefined
	  		  // count: ,
	  		  // offset: 
	  })
	  webSocketHandle.addListener(20, 'chatroom', this.handleChatMsg, data)
	  webSocketHandle.addListener(11, 'chatroom', this.handleIncreChatMsg, data)
  },
  handleIncreChatMsg(data, result) {
	  console.log(result)
	  if (!result || result.cmd != 11 || !result.data) {
	  	  return
	  }
	  let rd = result.data
	  let rid = data.isGroup ? rd.groupId : rd.chatId
	  if (rid != data.id) {
		  return
	  }
	  let item = {
	  		name: '',
	  		avatar: '',
			type: rd.msgType, // 0 text 1 forbidden 2 packet 3 image 4 sound 5 time 6 system
			id: rd.id,
			senderId: rd.from,
			content: rd.content,
			isSelf: rd.from == uni.getStorageSync("userId")
	  }
	  if (data.isGroup) {
	  	item.senderAvatar = rd.fromAvatar
	  	item.senderNick = rd.fromName
	  } else {
	  	if (item.isSelf) {
	  		item.senderAvatar = uni.getStorageSync("avatar")
	  		item.senderNick = uni.getStorageSync("userName")
	  	} else {
			item.senderAvatar = data.friendAvatar
			item.senderNick = data.friendName
			item.senderAvatar = item.senderAvatar ? item.senderAvatar : '../../static/icon/default_avatar.png'
	  	}
	  }
	  let time = new Date(rd.createTime).getTime()
		if (data.lastShowTime + 5*60*1000 < time) {
			data.msgList.push({
				type: 5,
				content: chatroomTimeToString(time),
				id: 't' + rd.id
			})
			data.lastShowTime = time
		}
		data.msgList.push(item)
	  
	   v.$nextTick(function(){
	  	uni.pageScrollTo({
	  		duration: 100,
	  		scrollTop: 99999999999
	  	})
	   })
  },
  handleChatMsg(data, result) {
	if (!result || result.cmd != 20 || !result.data) {
		return
	}
	let rd = result.data
	let list = []
	if (data.isGroup) {
		for (let key in rd.groups) {
			if (data.id == key) {
				list = rd.groups[key]
				break
			}
		}
	} else {
		for (let key in rd.friends) {
			if (data.id == key) {
				list = rd.friends[key]
				break
			}
		}
	}
	if (!list || list.length == 0) {
		return 
	} 
	let lastShowTime = 0
	for (let item of list) {
		let time = new Date(item.createTime).getTime()
		if (lastShowTime + 5*60*1000 < time) {
			data.msgList.push({
				type: 5,
				content: chatroomTimeToString(time),
				id: 't' + item.id
			})
			lastShowTime = time
		}
		let message = {
			type: item.msgType, // 0 text 1 forbidden 2 packet 3 image 4 sound 5 time 6 system
			id: item.id,
			senderId: item.from,
			content: item.content,
			isSelf: item.from == uni.getStorageSync("userId")
		}
		if (data.isGroup) {
			message.senderAvatar = item.fromAvatar
			message.senderNick = item.fromName
		} else {
			if (message.isSelf) {
				message.senderAvatar = uni.getStorageSync("avatar")
				message.senderNick = uni.getStorageSync("userName")
			} else {
				message.senderAvatar = data.friendAvatar
				message.senderNick = data.friendName
				message.senderAvatar = message.senderAvatar ? message.senderAvatar : '../../static/icon/default_avatar.png'
			}
		}
		data.msgList.push(message)
	}
	data.lastShowTime = lastShowTime
	 v.$nextTick(function(){
		uni.pageScrollTo({
			duration: 0,
			scrollTop: 99999999999
		})
	 })
  },
	sendMessage(data) {
		if (data.sendMsg) {
			let msg = {
				cmd: 11,
				from: uni.getStorageSync("userId"),
				to: data.isGroup ? undefined : data.id,
				groupId: data.isGroup ? data.id : undefined,
				chatType: data.isGroup ? 1 : 2,
				msgType: 0,
				content: data.sendMsg
			}
			webSocketHandle.sendMessage(msg)
			// data.msgList.push(message)
			data.sendMsg = ''
			data.sendText = false
		} 
	},
	

}
