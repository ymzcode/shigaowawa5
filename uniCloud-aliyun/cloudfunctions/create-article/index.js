'use strict';
const uniIdCo = uniCloud.importObject('uni-id-co');
const UniSecCheck = require('uni-sec-check');

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
	
	// 先发文章，有了id然后审核
	const collection = dbJQL.collection('opendb-news-articles')
	const articleRes = await collection.add(params)
	
	// console.log('123123123123123123', articleRes)
	
	const albumArr = event.album.split(',')

	// 图片审查
	const uniSecCheck = new UniSecCheck({ // 创建内容安全检测模块实例
		provider: 'mp-weixin', // 指定所使用服务的提供商，目前仅支持mp-weixin
		requestId: context.requestId, // 请求Id
	})
	
	const idCommonToken = uniCloud.importObject('id-common-token')
	const {
		uid
	} = await idCommonToken.checkToken(event.uniIdToken)
	
	const { data } = await idCommonToken.getUserInfo(uid)
	
	
	albumArr.map(item => {
		const image = item
		uniSecCheck.imgSecCheck({
			image: image, // 图片文件url或图片cloudID
			openid: data[0].wx_openid.mp, // 用户的openid
			scene: 3, // 场景值
			version: 2 // 接口版本号
		}).then(res => {
			console.log(res)
			// 后续有待优化
			uniCloud.database().collection('img-safe-review-log').add({
				user_id: uid,
				img_url: image,
				status: 1,
				traceId: res.traceId,
				article_id: articleRes.id,
				publish_date: Date.now()
			})
		})
	})



	
	return articleRes

	//返回数据给客户端
	// return event
};
