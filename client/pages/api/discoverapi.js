import {discoverTimeToString} from './common.js'
import webSocketHandle from './webSocketHandle.js'

export default {
  handleDiscover(data, result) {
	  if (result.cmd != 27) {
		  return
	  }
	  let rd = result.data
	  if (result.type == 1) {
		  let l = []
		  for (let discover of rd) {
		  	let item = {
		  		id: discover.id,
		  		name: discover.userName,
		  		avatar: discover.userAvatar,
		  		time: discoverTimeToString(discover.createTime),
		  		content: discover.content,
				userId: discover.userid
		  	}
			item.avatar = item.avatar ? item.avatar : '../../static/icon/default_avatar.png'
			l.push(item)
		  }
		  data.list = l
		  return
	  } else {
		  let item = {
			  id: rd.id,
			  name: rd.userName,
			  avatar: rd.userAvatar,
			  time: discoverTimeToString(rd.createTime),
			  content: rd.content,
			  userId: rd.userid
		  }
		  item.avatar = item.avatar ? item.avatar : '../../static/icon/default_avatar.png'
		  data.list.unshift(item)
	  }
  },
  initDiscover(data) {
	  webSocketHandle.sendMessage({Cmd:27, type:2})
	  let that = this
	  uni.$on('cmd27', function(result) {
		  that.handleDiscover(data, result)
	  })
  },
  
  
}
