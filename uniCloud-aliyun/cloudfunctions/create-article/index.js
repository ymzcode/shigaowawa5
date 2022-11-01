'use strict';
const uniIdCo = uniCloud.importObject('uni-id-co')


exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	console.log('1111111 : ', context)

	// // 校验token是否传递
	// // const userInfo = await uniID.check(event.uniIdToken)
	// if (!event.uniIdToken) {
	// 	return {
	// 		errCode: "TOKEN_IS_NULL",
	// 		errMsg: 'Token未获取，请检查登陆状态'
	// 	}
	// }
	// const idCommonToken = uniCloud.importObject('id-common-token')
	// const tokenRes = await idCommonToken.checkToken(event.uniIdToken)
	
	
	// console.log(tokenRes)

	const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
		event,
		context 
	})

	// 构造默认参数
	const params = {
		article_status: 1,
		album: event.album,
		title: event.title,
		category_id: event.category_id
	}

	const collection = dbJQL.collection('opendb-news-articles')
	const res = await collection.add(params)
	return res

	//返回数据给客户端
	// return event
};
