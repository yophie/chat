export default {
  init (data) {
	let invite = false
	if (data.id > 0) 
		invite = true
	let list = [{}];
	for (let i = 0; i < 26; i++) {
		list[i] = {};
		list[i].index = String.fromCharCode(65 + i);
		list[i].friends = [{id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png',checked: false, inGroup: invite && i%6==0}]
	}
    data.list = list
  },
  create(selectedList) {
	  let groupid = 1
	  console.log(selectedList)
	  uni.navigateTo({
	  	url: '/pages/chat/chatroom?id=' + groupid
	  })
  }
}