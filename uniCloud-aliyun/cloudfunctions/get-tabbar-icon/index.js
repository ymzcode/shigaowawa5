'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	})
	
	dbJQL.setUser({
		role: ['admin']
	})
	
	const collection = dbJQL.collection('tabbar-icon')
	
	const res = await collection.get()
	
	//返回数据给客户端
	return res
};
