'use strict';
const uniID = require('uni-id-common')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	if (!event.id) {
		return {
			errCode: 1,
			errMsg: '传递参数不完整'
		}
	}
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	})

	// const uniIDIns = uniID.createInstance({ // 创建uni-id实例
	// 	context: context
	// })
	// const user_uid = await uniIDIns.checkToken(event.uniIdToken)

	// console.log(user_uid)
	
	const idCommonToken = uniCloud.importObject('id-common-token')
	const tokenRes = await idCommonToken.checkToken(event.uniIdToken)

	const collection = dbJQL.collection('opendb-news-favorite')
	const res = await collection.where({
		article_id: event.id,
	}).get()

	// if (res.affectedDocs === 0) {
	// 	// 新增喜欢
	// 	const add = await collection.add({
	// 		article_id: event.id
	// 	})
	// } else {
	// 	// 删除喜欢
	// 	// const delete = await collection.
	// }

	//返回数据给客户端
	return tokenRes
};
