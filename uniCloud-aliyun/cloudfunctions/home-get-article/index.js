'use strict';
const uniID = require('uni-id-common')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	})
	
	if (!event.hasOwnProperty('size') || !event.hasOwnProperty('page')) {
		return {
			errCode: 1,
			errMsg: '传递参数不完整'
		}
	}

	// // 如果有token 解析用户
	// if (event.uniIdToken) {
	// 	const uniIDIns = uniID.createInstance({ // 创建uni-id实例
	// 		context: context
	// 	})
	// 	const payload = await uniIDIns.checkToken(event.uniIdToken)
	// 	console.log(payload)
	// }

	const collection = dbJQL.collection('opendb-news-articles')
	const skip_count = (event.page - 1) * event.size
	const limit_count = Number(event.size)
	const res = await collection.where({
		article_status: 1
	}).skip(skip_count) // 跳过前20条
		.limit(limit_count) // 获取20条
		.get()
	//返回数据给客户端
	return res
};
