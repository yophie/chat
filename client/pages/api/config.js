const env = 'product'

export default {
	getConfig() {
		if(env === 'dev'){
			return {
				clienturl: 'http://47.242.141.164',
				serviceurl: 'http://47.242.141.164',
				websocketServerurl: 'ws://47.242.141.164',
				appid: 'wxb87cb9510aac006d'
			}
		} else {
			return {
				clienturl: 'http://www.yonyouxukk.cn',
				serviceurl: 'http://www.yonyouxukk.cn/',
				websocketServerurl: 'ws://www.yonyouxukk.cn/ws',
				appid: 'wxb87cb9510aac006d'
			}
		}
	}
}
