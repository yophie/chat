
export default {
  search (data) {
    let keyword = data.keyword
	console.log(keyword)
	let result = []
	for (let i = 1; i <= 10; i++) {
		result.push({id: i, name: '昵称' + i, avatar: '/static/icon/avatar.png', status: i%3})
	}
	
	data.list = result
  },
  request (id) {
	  console.log("request" + id)
  }
}

