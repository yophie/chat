
export default {
  init (data) {
    data.rate = 0.02
	data.least = 1
	data.balance = 1000
  },
  withdraw(amount, data) {
	  console.log("提现" + amount)
	  data.balance = 1000
  }
}
