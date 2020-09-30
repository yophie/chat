import {http} from "./common"
import {MessageBox} from "element-ui";

export default {
  init(data) {
    http.get('/api/settings/value',{}).then(function(res){
      console.log(res.data.lowest)
      data.limit = res.data.lowest
      data.rate = res.data.fee*100
    })
  },
  submitLimit(limit) {
    http.post('/api/settings/lowest?lowest=' + limit).then(function(res){
      MessageBox.alert('最低提现额度设置成功', '成功', {
        type: 'success'
      });
    })
  },
  submitRate(rate) {
    http.post('/api/settings/fee?fee=' + rate/100).then(function(res){
      MessageBox.alert('提现手续费率设置成功', '成功', {
        type: 'success'
      });
    })
  },
}
