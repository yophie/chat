const env = 'product'

export default {
	getConfig() {
		if(env === 'dev'){
			return {
				clienturl: 'http://192.168.57.139:8080',
				serviceurl: '',
				websocketServerurl: 'ws://192.168.57.139:8888',
				appid: 'wxb87cb9510aac006d'
			}
		} else{
			return {
				clienturl: 'http://47.242.141.164',
				serviceurl: 'http://47.242.141.164/',
				websocketServerurl: 'http://47.242.141.164/ws',
				appid: 'wxb87cb9510aac006d'
			}
		}
	}
}
