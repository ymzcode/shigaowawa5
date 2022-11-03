'use strict';
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
	const collection = dbJQL.collection('opendb-news-articles')
	const res = await collection.where({
		_id: event.id
	}).get()
	//返回数据给客户端
	return res
};
