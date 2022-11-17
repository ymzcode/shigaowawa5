'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	})

	const idCommonToken = uniCloud.importObject('id-common-token')
	const {
		uid
	} = await idCommonToken.checkToken(event.uniIdToken)

	const skip_count = (event.page - 1) * event.size
	const limit_count = Number(event.size)

	const res = await dbJQL.collection('opendb-news-articles').where('uid == auth.uid && article_status == 1 || article_status == 99').skip(skip_count) // 跳过前20条
		.limit(limit_count) // 获取20条
		.get({
			getCount: true
		})

	//返回数据给客户端
	return res
};
