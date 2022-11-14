'use strict';

const UniSecCheck = require('uni-sec-check');

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

	const admin_dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context
		event,
		context
	})

	admin_dbJQL.setUser({
		role: ['admin']
	})


	let t_uid = null
	let idCommonToken = null
	// get可以游客访问
	if (event.action !== 'get') {
		idCommonToken = uniCloud.importObject('id-common-token')
		const {
			uid
		} = await idCommonToken.checkToken(event.uniIdToken)
		t_uid = uid
	}

	let res = {}

	switch (event.action) {
		case 'get': {
			const skip_count = (event.page - 1) * event.size
			const limit_count = Number(event.size)

			const user = admin_dbJQL.collection('uni-id-users').field('_id,avatar_file,nickname').getTemp()
			const comment = dbJQL.collection('opendb-news-comments').where({
				article_id: event.id
			}).getTemp()

			res = await admin_dbJQL.collection(comment, user).foreignKey('opendb-news-comments.user_id').skip(
					skip_count) // 跳过前20条
				.limit(limit_count) // 获取20条
				.get({
					getCount: true
				})

			break
		}
		case 'add': {

			// 内容安全检测
			const uniSecCheck = new UniSecCheck({ // 创建内容安全检测模块实例
				provider: 'mp-weixin', // 指定所使用服务的提供商，目前仅支持mp-weixin
				requestId: context.requestId // 请求Id
			})
			
			const { data } = await idCommonToken.getUserInfo(t_uid)
			
			// console.log(data)
			
			const textSecCheckRes = await uniSecCheck.textSecCheck({
				content: event.comment_content, // 文本内容，不可超过500KB
				openid: data[0].wx_openid.mp,
				scene: 2, // 场景值
				version: 2
			})

			console.log('111111111', textSecCheckRes);
			
			res = textSecCheckRes
			
			// 拦截检测不通过的禁止评论写入
			if (textSecCheckRes.errCode === 'uni-sec-check-risk-content') {
				res = {
					errCode: "SAFE_NO_PASS",
					errMsg: `您的评论涉及${textSecCheckRes.result.label}，请更改您的表述`,
					showToastDuration: 4000
				}
			} else if (textSecCheckRes.errCode === 0) {
				res = await dbJQL.collection('opendb-news-comments').add({
					article_id: event.id,
					user_id: t_uid,
					comment_content: event.comment_content,
					like_count: 0,
					comment_type: 0
				})
			}
			
			break
		}
		case 'delete': {
			break
		}
		case 'reply': {
			res = await dbJQL.collection('opendb-news-comments').add({
				article_id: event.id,
				user_id: t_uid,
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
