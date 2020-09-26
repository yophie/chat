export default {
  init(data) {
    data.limit = 10
    data.rate = 2
  },
  submitLimit(limit) {
    console.log("submit limit " + limit)
  },
  submitRate(rate) {
    console.log("submit rate " + rate/100)
  },
}
