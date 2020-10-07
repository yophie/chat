import webSocketHandle from './webSocketHandle.js'

export default {
  post (content) {
	let msg = {
		cmd: 27,
		type: 0,
		content: content
	}
	webSocketHandle.sendMessage(msg)
  }
}
