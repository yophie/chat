const env = process.env.NODE_ENV

export default {
	getConfig() {
		if(env === 'development'){
			return {
				clienturl: 'http://localhost:8080',
				serviceurl: '',
				websocketServerurl: 'ws://localhost:8888/',
				appid: 'wxb87cb9510aac006d',
				bucket: 'xsjj-chat',
				region: 'oss-cn-hongkong',
				accessKeyId: 'LTAI4G4jPLck77YuoSAFNtkW',
				accessKeySecret: 't3TNW1By9IkyO2cjyeigtegPtAXaG2'
			}
		} else {
			return {
				clienturl: 'http://www.yonyouxukk.cn',
				serviceurl: 'http://www.yonyouxukk.cn/',
				websocketServerurl: 'ws://www.yonyouxukk.cn/ws',
				appid: 'wxb87cb9510aac006d',
				bucket: 'xsjj-chat',
				region: 'oss-cn-hongkong',
				accessKeyId: 'LTAI4G4jPLck77YuoSAFNtkW',
				accessKeySecret: 't3TNW1By9IkyO2cjyeigtegPtAXaG2'
			}
		}
	}
}
