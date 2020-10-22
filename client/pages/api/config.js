const env = process.env.NODE_ENV

export default {
	getConfig() {
		if(env === 'development'){
			return {
				clienturl: 'http://192.168.0.106:8080',
				serviceurl: '',
				websocketServerurl: 'ws://192.168.0.106:8888/',
				appid: 'wxb87cb9510aac006d',
				bucket: 'xsjj-chat',
				region: 'oss-cn-hongkong',
				accessKeyId: '',
				accessKeySecret: ''
			}
		} else {
			return {
				clienturl: 'http://www.yonyouxukk.cn',
				serviceurl: 'http://www.yonyouxukk.cn/',
				websocketServerurl: 'ws://www.yonyouxukk.cn/ws',
				appid: 'wxb87cb9510aac006d',
				bucket: 'xsjj-chat',
				region: 'oss-cn-hongkong',
				accessKeyId: '',
				accessKeySecret: ''
			}
		}
	}
}
