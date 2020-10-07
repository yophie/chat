var appid = 'wxb87cb9510aac006d'
var redirect_uri = encodeURIComponent('http://192.168.31.173:8080/#/pages/loginback')
var response_type = 'code'
var scope = 'snsapi_userinfo'
var wechaturl = 'https://open.weixin.qq.com/connect/oauth2/authorize'

export default {
	login(param) {
		let state = param
		var wechatAuthUrl = wechaturl + '?appid=' + appid
							+ '&redirect_uri=' + redirect_uri + '&response_type=' + response_type
							+ '&scope=' + scope + '&state=' + state + '#wechat_redirect'
		//window.location.href = 'http://192.168.0.101:8080?code=123/#/pages/loginback'
		uni.showLoading({
		    title: '跳转微信登录中'
		});
		window.location.href = wechatAuthUrl
	}
	
}
