export default {
	BackPage() {
		if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
			let url = '/' + __wxConfig.pages[0]
			return uni.redirectTo({url})
		}
		uni.navigateBack({
			delta: 1
		});
	},
	fixed(num, accuracy) {
		if (isNaN(parseFloat(num))) {
			return -1; 
		}
		let numStr = num.toString()
		let index = numStr.indexOf('.')
		if (index == -1) {
			return Number(num)
		}
		if (!accuracy || accuracy <= 0) {
			return Number(numStr.slice(0, index))
		} else {
			return Number(numStr.slice(0, index + accuracy + 1))
		} 
	},
}