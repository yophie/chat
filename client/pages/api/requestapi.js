import {http} from './common.js'

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
  request (id, success, fail) {
	  http.get('api/friend/apply', {applyUser: id}, function(res) {
		if (res.code == 10029) {
			success()
		} else {
			fail()
		}
	  })
  }
}

