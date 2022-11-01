// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const uniID = require('uni-id-common')

module.exports = {
	_before: function() { // 通用预处理器
		const clientInfo = this.getClientInfo()
		this.uniID = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
			clientInfo
		})
	},
	async checkToken(token) {
		if (!token) {
			return {
				errCode: 'TOKEN_IS_NULL',
				errMsg: '参数不能为空'
			}
		}
		const {
			errCode,
			errMsg,
			uid
		} = await this.uniID.checkToken(token)
		
		if (errCode) { // uni-id-common的checkToken接口可能返回`uni-id-token-expired`、`uni-id-check-token-failed`错误码，二者均会触发客户端跳转登陆页面
			return {
				errCode,
				errMsg
			}
		}
		const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
			clientInfo: this.getClientInfo()
		})
		
		const collection = dbJQL.collection('uni-id-users')
		const RRR = await collection.where({
			_id: uid
		}).get()
		
		return RRR
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
