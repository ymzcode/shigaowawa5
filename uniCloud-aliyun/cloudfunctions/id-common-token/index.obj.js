// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const uniIdCommon = require('uni-id-common')

module.exports = {
	_before: function() { // 通用预处理器
		const clientInfo = this.getClientInfo()
		this.uniIdCommon = uniIdCommon.createInstance({ // 创建uni-id实例，其上方法同uniID
			clientInfo
		})
	},
	async checkToken(token) {
		if (!token) {
			return {
				errCode: 'TOKEN_IS_NULL',
				errMsg: '无登录信息'
			}
		}
		const tokenRes = await this.uniIdCommon.checkToken(token)

		if (tokenRes.errCode) {
			return {
				errCode: 'BACK_LOGIN',
				errMsg: 'Token过期请重新登录'
			}
		}

		return tokenRes
	},
	async getUserInfo(uid) {
		
		if (!uid) {
			return {
				errCode: 'UID_IS_NULL',
				errMsg: '参数传递错误'
			}
		}
		const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
			clientInfo: this.getClientInfo()
		})

		dbJQL.setUser({ // 指定后续执行操作的用户信息，此虚拟用户将同时拥有传入的uid、role、permission
			role: ['admin'] // 指定当前执行用户的角色为admin。如果只希望指定为admin身份，可以删除uid和permission节点
		})
		const userInfo = await dbJQL.collection('uni-id-users').where({
			_id: uid
		}).field('wx_openid,avatar_file,nickname').get()
		return userInfo
	}
	/**
	 * method1方法描述
	 * @param {string} param1 参数1描述
	 * @returns {object} 返回值描述
	 */
	/* 
	method1(param1) {
		// 参数校验，如无参数则不需要
		if (!param1) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '参数不能为空'
			}
		}
		// 业务逻辑
		
		// 返回结果
		return {
			param1 //请根据实际需要返回值
		}
	}
	*/
}
