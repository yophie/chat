import {http,dateFormat} from "./common"

export default {
  handleWithdraw(item) {
    http.post('/api/bill/audit',{id:item.id, state:1}).then(function(res){
      if (res.data.code == 10035) {
        item.completeDate = dateFormat(res.data.approvalTime)
        item.status = 1
      }
    })
  },
  query(param, callback) {
    let p = {
      type: 3,
      state: param.status == -1 ? undefined : param.status,
      startApplyTime: param.applyDateRange ? param.applyDateRange[0] : undefined,
      endApplyTime: param.applyDateRange ? param.applyDateRange[1] : undefined,
      startApprovalTime: param.completeDateRange ? param.completeDateRange[0] : undefined,
      endApprovalTime: param.completeDateRange ? param.completeDateRange[1] : undefined,
      pageSize: param.pageSize,
      pageNo: param.page
    }
    http.post('/api/bill/list',p).then(function(res){
      let list = []
      for (let bill of res.data.billList.list) {
        let b = {
          id: bill.id,
          account: bill.userName,
          amount: bill.amount * -1 + '元',
          rate: bill.fee,
          rateStr: bill.fee*100 + '%',
          actAmount: bill.approvalAmount * -1 + '元',
          applyDate: dateFormat(bill.applyTime),
          completeDate: dateFormat(bill.approvalTime),
          status: bill.state
        }
        list.push(b)
      }
      callback(list, res.data.billList.total)
    })
  }
}
