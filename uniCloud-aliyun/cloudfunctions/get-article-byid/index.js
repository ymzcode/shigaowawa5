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
	const collection = dbJQL.collection('opendb-news-articles')
	
	
	await db.collection('opendb-news-articles').where({
		_id: event.id
	}).update({
		view_count:$cmd.inc(1)
	})
	
	const res = await collection.where({
		_id: event.id
	}).get()
	
	console.log(res);
	
	//返回数据给客户端
	return res
};
