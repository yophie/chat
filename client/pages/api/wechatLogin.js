var appid = 'wxcb481b7ae6063d85'
var redirect_uri = 'http://192.168.0.103:8080'
var response_type = 'code'
var scope = 'snsapi_userinfo'
var wechatAuthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid 
					+ '&redirect_uri=' + redirect_uri + '&response_type=' + response_type
					+ '&scope' + scope + '#wechat_redirect'
export default {
	login() {
		window.location.href = wechatAuthUrl
	}
	
}
