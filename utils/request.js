export function initRequest(Vue) {
	Vue.prototype.$request = request
}

function backLogin() {
	
}

export function request(functionName, options) {
	
	let showModal = true
	
	
	let call = uniCloud.callFunction({
		name: functionName,
		data: options
	})

	return call.then(result => {
		result = result.result
		if (!result) {
			return Promise.resolve(result)
		}

		if (result.errCode) {
			return Promise.reject(result)
		}

		return Promise.resolve(result)

	}).catch(err => {
		if (err.errCode === 'BACK_LOGIN') {
			uni.navigateTo({
				url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd'
			})
		}
		showModal && uni.showToast({
			title: err.errMsg || '请求服务失败',
			icon: 'none'
		})
		return Promise.reject(err)
	})
}
