
export default {
  init (data) {
	let id = data.id
    data.isForbidden = id
	data.isGroup = id%4 == 0
	data.isGroupOwner = id%8 == 0
	data.name = '群聊名称后台获取'
	let memberList = []
	for (let i = 1; i <= 20; i++) {
		memberList.push({id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png'})
	}
	data.memberList = memberList
  },
  changeForbidden(id, isForbidden) {
	  console.log("set " + id + " forbidden " + isForbidden)
  },
  changeGroupName(data, name) {
	  console.log("set " + data.id + " name " + name)
	  data.name = name
  },
  disbanded(id) {
	  console.log("disbanded " + id)
	  uni.navigateTo({
	  	url: '/pages/chat/chat.vue'
	  })
  },
  leave(id) {
  	  console.log("leave " + id)
	  uni.navigateTo({
	  	url: '/pages/chat/chat.vue'
	  })
  }
}
