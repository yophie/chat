
export default {
  billList (data) {
    let billList = []
	for (let i = 1; i <= 20; i++) {
		billList.push({id: i, title: '昵称' + i, avatar: '/static/icon/avatar.png',
			time: '2020-09-04 13:37', amount: 20.5})
	}
	
    data.list = billList
  }
}
