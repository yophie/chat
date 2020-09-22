
export default {
  requestList (data) {
    let requestList = []
	for (let i = 1; i <= 3; i++) {
		requestList.push({id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png',msg: '我是' + '昵称' + i, status: i%3})
	}
	
    data.list = requestList
  },
  accept(request) {
	  console.log("accept" + request.id)
	  request.status = 1
  },
  reject(request) {
	  console.log("reject" + request.id)
	  request.status = 2
  },
}

