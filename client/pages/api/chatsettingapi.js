import {http} from './common.js'

export default {
  init (data) {
	  http.post('api/group/info', {groupId: data.id}, function(res) {
		  if (res.code == '10031') {
			  data.isForbidden = res.type == 1
			  data.isGroup = true
			  data.isGroupOwner = res.isOwner
			  data.name = res.groupName
			  let memberList = []
			  for (let m of res.members) {
			  	let item = {
					id: m.myId, 
					name: m.myName, 
					avatar: m.myAvatar
				}
				item.avatar = item.avatar ? item.avatar : '../../static/icon/default_avatar.png'
				data.memberList.push(item)
			  }
		  } else {
			  uni.showModal({
			      title: '错误提示',
			      content: '系统错误，请稍后再试！'
			  });
		  }
	  })
  },
  changeForbidden(id, isForbidden) {
	  http.post('api/group/update', {groupId: id, type: isForbidden ? 1 : 0}, function(res) {
		   if (res.code == '10031') {
			   
		   } else {
			  uni.showModal({
			      title: '错误提示',
			      content: '系统错误，请稍后再试！'
			  });
		  }
	  })
  },
  changeGroupName(data, name) {
	  http.post('api/group/update', {groupId: data.id, groupName: name}, function(res) {  
		  if (res.code == '10031') {
				data.name = name
		   } else {
			  uni.showModal({
				  title: '错误提示',
				  content: '系统错误，请稍后再试！'
			  });
		  }
	  })
  },
  disbanded(id) {
	  http.post('api/group/dismiss', {groupId: id},function(res) {
		  if (res.code == '10031') {
			  uni.switchTab({
			  	url: '/pages/chat/chat'
			  })
		  } else {
			  uni.showModal({
			      title: '错误提示',
			      content: '系统错误，请稍后再试！'
			  });
		  }
	  	
	  })
  },
  leave(id) {
	  http.post('api/group/exit', {groupId: id},function(res) {
	  	if (res.code == '10031') {
		  uni.switchTab({
			url: '/pages/chat/chat'
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
