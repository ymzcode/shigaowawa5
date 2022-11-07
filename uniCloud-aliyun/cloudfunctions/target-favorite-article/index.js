'use strict';
const db = uniCloud.database()
const $cmd = db.command
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
	
	const idCommonToken = uniCloud.importObject('id-common-token')
	const { uid } = await idCommonToken.checkToken(event.uniIdToken)
	

	const collection = dbJQL.collection('opendb-news-favorite')
	const res = await collection.where({
		article_id: event.id,
		user_id: uid
	}).get()

	if (res.affectedDocs === 0) {
		// 新增喜欢
		const addRes = await collection.add({
			article_id: event.id
		})
		// 添加喜欢数
		await db.collection('opendb-news-articles').where({
			_id: event.id
		}).update({
			like_count:$cmd.inc(1)
		})
		return addRes
	} else if (res.affectedDocs === 1) {
		// 删除喜欢
		const deleteRes = await collection.where({
			article_id: event.id,
			user_id: uid
		}).remove()
		// 减少喜欢数
		await db.collection('opendb-news-articles').where({
			_id: event.id
		}).update({
			like_count:$cmd.inc(-1)
		})
		return deleteRes
	}

	//返回数据给客户端
	return res
};
