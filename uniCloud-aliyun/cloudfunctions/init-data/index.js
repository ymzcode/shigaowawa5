'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	// 初始化分类数据
	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	})
	dbJQL.setUser({ // 指定后续执行操作的用户信息，此虚拟用户将同时拥有传入的uid、role、permission
		uid: '635f8156bf704d00010f608f', // 建议此处使用真实uid
		role: [], // 指定当前执行用户的角色为admin。如果只希望指定为admin身份，可以删除uid和permission节点
		permission: []
	})
	const collection = dbJQL.collection('opendb-news-categories')
	const res = await collection.add([{
		name: '石膏娃娃'
	}, {
		name: '流体'
	}, {
		name: '其他'
	}])

	//返回数据给客户端
	return event
};
