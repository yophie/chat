const env = process.env.NODE_ENV

export default {
	getConfig() {
		if(env === 'development'){
			return {
				clienturl: 'http://localhost:8080',
				serviceurl: '',
				websocketServerurl: 'ws://localhost:8888/',
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
