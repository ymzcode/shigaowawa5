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


	const res = await dbJQL.collection('opendb-news-articles').where({
			_id: event.id,
			user_id: uid
		}).update({
			article_status: 2
		})

	return res
};
