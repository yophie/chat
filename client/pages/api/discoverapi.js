import webSocketHandle from './webSocketHandle.js'
import {discoverTimeToString} from './common.js'

export default {
  handleDiscover(data, result) {
	  console.log(result)
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
		  data.list.unshift({
			  id: rd.id,
			  name: rd.userName,
			  avatar: rd.userAvatar,
			  time: discoverTimeToString(rd.createTime),
			  content: rd.content,
			  userId: rd.userid
		  })
	  }
  },
  initDiscover(data) {
	  webSocketHandle.sendMessage({Cmd:27, type:2})
	  webSocketHandle.addListener(27, 'discoverList', this.handleDiscover, data)
  },
  
  
}
