'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	if (!event.id || !event.action) {
		return {
			errCode: 1,
			errMsg: '传递参数不完整'
		}
	}

	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context
	})

	const idCommonToken = uniCloud.importObject('id-common-token')
	const {
		uid
	} = await idCommonToken.checkToken(event.uniIdToken)

	const collection = dbJQL.collection('opendb-news-comments')

	let res = {}

	switch (event.action) {
		case 'get': {
			const skip_count = (event.page - 1) * event.size
			const limit_count = Number(event.size)
			res = await collection.where({
					article_id: event.id
				}).skip(skip_count) // 跳过前20条
				.limit(limit_count) // 获取20条
				.get({
					getCount:true
				})
			break
		}
		case 'add': {
			res = await collection.add({
				article_id: event.id,
				user_id: uid,
				comment_content: event.comment_content,
				like_count: 0,
				comment_type: 0
			})
			break
		}
		case 'delete': {
			break
		}
		case 'reply': {
			res = await collection.add({
				article_id: event.id,
				user_id: uid,
				comment_content: event.comment_content,
				like_count: 0,
				comment_type: 1,
				reply_user_id: event.reply_user_id,
				reply_comment_id: event.reply_comment_id
			})
			break
		}
	}
	//返回数据给客户端
	return res
};
