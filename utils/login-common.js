const loginUtils = {
	// 检查是否登录
	checkLogin() {
		const token = uni.getStorageSync('uni_id_token')
		if (!token) {
			uni.showModal({
				cancelText: '返回首页',
				confirmText: '确定',
				content: '未登录，请先登录',
				success: (res) => {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.navigateTo({
							url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd'
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
						uni.switchTab({
							url: '/pages/home/home'
						})
					}
				}
			})
		}
	},
	// 清除登录信息
	clearLoginInfo() {
		uni.removeStorageSync('uni_id_token')
		uni.removeStorageSync('uni-id-pages-userInfo')
		uni.removeStorageSync('uni_id_token_expired')
	}
}

export default loginUtils
