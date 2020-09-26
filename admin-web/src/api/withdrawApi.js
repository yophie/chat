export default {
  handleWithdraw(item) {
    item.status = 1
    console.log("handle withdraw " + item.id)
  },
  query(param, callback) {
    console.log(param)
    let list = []
    for (let i = 0; i< 20; i++) {
      let item = {
        id: i,
        account: '提现人' + i,
        amount: i*19,
        rate: 0.02,
        rateStr: 0.02*100 + '%',
        actAmount: i*18,
        applyDate: '2020-09-22',
        completeDate: '2020-09-23',
        status: i%2
      }
      list.push(item)
    }
    callback(list, 50)
  }
}
