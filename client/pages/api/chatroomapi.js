import {http,chatroomTimeToString,getFromInfo,transContent} from './common.js'
import webSocketHandle from './webSocketHandle.js'
let v

export default {
  chatroominit (data, v1, reload) {
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
					  data.friendName = fromInfo ? fromInfo.name : ''
					  if (reload) {
						  that.chatMsgInit(data)
					  }
					  
				  })
			  } else {
				 if (reload) {
					  that.chatMsgInit(data)
				}
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
	  let that = this
	  let cmd20l,cmd11l,cmd33l,cmd35l,cmd36l
	  uni.$once('cmd20', cmd20l = function(result) {
		 that.handleChatMsg(data, result)
	  })
	  uni.$on('cmd11', cmd11l = function(result) {
		 that.handleIncreChatMsg(data, result)
	  })
	  uni.$once('cmd33', cmd33l = function(result) {
	  	 that.handleIncreChatMsg(data, result)
	  })
	  uni.$once('cmd35', cmd35l = function(result) {
	  	 that.handleIncreChatMsg(data, result)
	  })
	  uni.$on('cmd36', cmd36l = function(result) {
		  if (result && result.data && result.data.groupId == data.id) {
			  data.name = result.data.content + '(' + data.groupMemNum + ')'
		  }
	  })
	  data.listeners = [
		  {c: 'cmd20', l: cmd20l},
		  {c: 'cmd11', l: cmd11l},
		  {c: 'cmd33', l: cmd33l},
		  {c: 'cmd35', l: cmd35l},
		  {c: 'cmd36', l: cmd36l}]
  },
  handleIncreChatMsg(data, result) {
	  console.log(result)
	  if (!result || !result.data || (result.cmd != 11 && result.cmd != 33 && result.cmd != 35)) {
	  	  return
	  }
	  let rd = result.data
	  let rid = data.isGroup ? rd.groupId : rd.chatId
	  if (rid != data.id) {
		  return
	  }
	  if (result.cmd == 33 || result.cmd == 35) {
		  uni.showModal({
		  	title: '提醒',
			showCancel: false,
		  	content: '您已被管理员踢出群聊！',
			complete() {
				uni.switchTab({
					url: '/pages/chat/chat'
				})
			}
		  })
		  
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
	  if (rd.msgType === 0 || (item.isSelf && rd.msgType === 1)) {
		  item.content = transContent(rd.content, '22px')
	  }
	  if (!item.isSelf && rd.msgType === 1) {
		  item.content = transContent('禁言消息：' + rd.content, '22px')
	  }
	  if (rd.msgType === 3) {
	  	data.imgList.push(rd.content + '?x-oss-process=image/auto-orient,1/resize,m_lfit,w_' + uni.getSystemInfoSync().screenWidth + '/quality,q_90')
	  	item.content = rd.content + '?x-oss-process=image/auto-orient,1/resize,m_lfit,h_100/quality,q_90'
		item.imgIndex = data.imgList.length - 1
		item.width = '100upx'
		item.height = '100px'
	  }
	  if (data.isGroup) {
	  	item.senderAvatar = rd.fromAvatar
	  	item.senderNick = rd.fromName
	  } else {
	  	if (item.isSelf) {
	  		item.senderAvatar = uni.getStorageSync("avatar")
	  		item.senderNick = uni.getStorageSync("userName")
			item.senderAvatar = item.senderAvatar ? item.senderAvatar : '../../static/icon/default_avatar.png'
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
		let isSelf = item.from == uni.getStorageSync("userId")
		if (data.isGroup && !data.isGroupOwner && !isSelf && item.msgType == 1) {
			continue
		}
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
			isSelf: isSelf
		}
		if (item.msgType === 0 || (message.isSelf && item.msgType === 1)) {
		  message.content = transContent(item.content, '22px')
		}
		if (!message.isSelf && item.msgType === 1) {
		  message.content = transContent('禁言消息：' + item.content, '22px')
		}
		if (item.msgType === 3) {
			data.imgList.push(item.content + '?x-oss-process=image/auto-orient,1/resize,m_lfit,w_' + uni.getSystemInfoSync().screenWidth + '/quality,q_90')
			message.content = item.content + '?x-oss-process=image/auto-orient,1/resize,m_lfit,h_100/quality,q_90'
			message.imgIndex = data.imgList.length - 1
			message.width = '100upx'
			message.height = '100px'
		}
		if (data.isGroup) {
			message.senderAvatar = item.fromAvatar
			message.senderNick = item.fromName
		} else {
			if (message.isSelf) {
				message.senderAvatar = uni.getStorageSync("avatar")
				message.senderNick = uni.getStorageSync("userName")
				message.senderAvatar = message.senderAvatar ? message.senderAvatar : '../../static/icon/default_avatar.png'
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
			//let content = data.sendMsg.replace(/<img code=".+?"[^>]*>/g , 'code')
			let content = data.sendMsg.replace(/<img code="/g , '').replace(/!@#@!"[^>]*>/g , '')
			let msg = {
				cmd: 11,
				from: uni.getStorageSync("userId"),
				to: data.isGroup ? undefined : data.id,
				groupId: data.isGroup ? data.id : undefined,
				chatType: data.isGroup ? 1 : 2,
				msgType: 0,
				content: content
			}
			webSocketHandle.sendMessage(msg)
			// data.msgList.push(message)
			data.sendMsg = ''
			data.sendText = false
		} 
	},
	sendPic(data, url) {
		if (url) {
			let msg = {
				cmd: 11,
				from: uni.getStorageSync("userId"),
				to: data.isGroup ? undefined : data.id,
				groupId: data.isGroup ? data.id : undefined,
				chatType: data.isGroup ? 1 : 2,
				msgType: 3,
				content: url
			}
			webSocketHandle.sendMessage(msg)
			// data.msgList.push(message)
		}
	}

}
