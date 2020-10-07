import {http} from './common.js'

export default {
  init (data) {
	if (data.id > 0) {
		http.get('api/group/invite', {state: 1, groupId: data.id} , function(res) {
			if (res.code != '10031') {
				uni.showModal({
				    title: '错误提示',
				    content: '系统错误，请稍后再试！'
				});
			} else {
				for (let f of res.friends) {
					let item = {
						id: f.id, 
						name: f.friendNick, 
						avatar: f.friendAvatar,
						checked: false, 
						friendId: f.friendId,
						inGroup: f.isGroupMember
					}
					item.avatar = item.avatar ? item.avatar : '../../static/icon/default_avatar.png'
					data.list.push(item)
				}
			}
		})
	} else {
		http.get('api/friend/list', {state: 1}, function(res) {
			if (res.code != '10027') {
				uni.showModal({
				    title: '错误提示',
				    content: '系统错误，请稍后再试！'
				});
			} else {
				for (let f of res.friends) {
					let item = {
						id: f.id, 
						name: f.friendNick, 
						avatar: f.friendAvatar,
						checked: false, 
						friendId: f.friendId,
						inGroup: false
					}
					data.list.push(item)
				}
			}
		})
	}
  },
  create(groupId, selectedListName, selectedList) {
	  if (groupId > 0) {
		  http.post('api/group/add', {groupId: groupId, friends: selectedList}, function(res) {
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
	  } else {
		  selectedList.push(uni.getStorageSync('userId'))
		  selectedListName.push(uni.getStorageSync('userName'))
		  let groupName = ''
		  let i = 0
		  for (let s of selectedListName) {
			  if (i > 0) {
				  groupName += '、'
			  }
			  groupName += s
			  i++
			  if (i >= 3) break
		  }
		  http.post('api/group/new', {groupName: groupName, friends: selectedList}, function(res) {
			if (res.code == '10031') {
			  uni.navigateTo({
				url: '/pages/chat/chatroom?id=' + res.groupId
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
}