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
}