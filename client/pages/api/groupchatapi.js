
export default {
  groupchatList (data) {
    let groupchatList = []
	for (let i = 1; i <= 3; i++) {
		groupchatList.push({id: i, name: '群聊' + i, avatar: '/static/icon/avatar.png',msg: '我是' + '昵称' + i})
	}
	
    data.list = groupchatList
  }
}

