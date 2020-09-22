export default {
  contactList (data) {
	let list = [{}];
	for (let i = 0; i < 26; i++) {
		list[i] = {};
		list[i].index = String.fromCharCode(65 + i);
		list[i].friends = [{id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png'}]
	}
	data.count = 26
    data.list = list
  }
}