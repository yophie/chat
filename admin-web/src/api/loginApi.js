import {http, goPath, setToken, removeToken} from "./common"

export default {

  login(form) {
    http.get('/api/user/login',{
      params: {
        username: form.username,
        password: form.password
      }
    }).then(function(res){
      setToken(res.data.token)
      goPath('/withdrawList')
    })
  },

  logout() {
    http.get('/api/user/logout').then(function(res){
      removeToken()
      goPath('/login')
    })
  }
}
