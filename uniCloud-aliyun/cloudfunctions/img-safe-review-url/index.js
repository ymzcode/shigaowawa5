'use strict';
const crypto = require('crypto');

function getSignature(token, timestamp, nonce, msgEncrypt) {
	const str = [token, timestamp, nonce, msgEncrypt].sort().join('')
	return crypto.createHash('sha1').update(str).digest("hex")
}

function PKCS7Decode(buf) {
	let padSize = buf[buf.length - 1]
	return buf.slice(0, buf.length - padSize)
}

function decryptMsg(encodingAESKey, msgEncrypt) {
	const key = Buffer.from(encodingAESKey + '=', 'base64')
	const iv = key.slice(0, 16)

	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
	decipher.setAutoPadding(false)

	let deciphered = Buffer.concat([decipher.update(msgEncrypt, 'base64'), decipher.final()])

	deciphered = PKCS7Decode(deciphered)

	const content = deciphered.slice(16)
	const length = content.slice(0, 4).readUInt32BE(0)

	return {
		message: JSON.parse(content.slice(4, length + 4).toString()),
		appId: content.slice(length + 4).toString()
	}
}
exports.main = async function(event, context) {
	const {
		signature: signature,
		timestamp: timestamp,
		nonce: nonce,
		echostr: echostr
	} = event.queryStringParameters


	let body = ''
	if (event.body !== '') {
		body = JSON.parse(event.body)
	}
	let result = body

	const tmpStr = getSignature('19971116', timestamp, nonce)

	if (signature === tmpStr) {
		// 验证是从微信发来的消息
		if (body.Encrypt) {
			const decrypt = decryptMsg('PBP5QKIIcndLdU6Cy160TXMkWrFg3ijQszTKAPYAkua', body.Encrypt)

			result = decrypt.message
			// 只接收内容安全事件通知
			if (result.Event !== 'wxa_media_check') {
				return 'success'
			}
			
			const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
				event,
				context
			})

			if (result.result.suggest !== 'pass') {
				
				const imgData = await dbJQL.collection('img-safe-review-log').where({
					traceId: result.trace_id
				}).get()
				
				if (imgData.code !== 0) {
					return 'error'
				}
				
				
				
				
				console.log(imgData)
				
				const imgData_tmp = imgData.data[0]
				
				
				// 将文章状态改为审核不通过
				const articleRes = await dbJQL.collection('opendb-news-articles').where({
					_id: imgData_tmp.article_id
				}).update({
					article_status: 99
				})
				
				
				console.log('更改文章状态')
				console.log(articleRes)
				
				const pppp = await uniCloud.deleteFile({
					fileList: [
						imgData_tmp.img_url // 阿里云fileID是url形式，例：https://xxx.com/xxx.png
					]
				})
				console.log(pppp)
				

				const updateRes = await dbJQL.collection('img-safe-review-log').where({
					traceId: result.trace_id
				}).update({
					status: 3
				})
				
				
				if (updateRes.updated === 0 || updateRes.code !== 0) {
					return 'error'
				}

			}
		}
		return 'success'
	} else {
		return 'success'
	}


}


// 'use strict';
// const crypto = require('crypto');

// function getSignature(token, timestamp, nonce, msgEncrypt) {
// 	const str = [token, timestamp, nonce, msgEncrypt].sort().join('')
// 	return crypto.createHash('sha1').update(str).digest("hex")
// }

// function PKCS7Decode(buf) {
// 	let padSize = buf[buf.length - 1]
// 	return buf.slice(0, buf.length - padSize)
// }

// function decryptMsg(encodingAESKey, msgEncrypt) {
// 	const key = Buffer.from(encodingAESKey + '=', 'base64')
// 	const iv = key.slice(0, 16)

// 	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
// 	decipher.setAutoPadding(false)

// 	let deciphered = Buffer.concat([decipher.update(msgEncrypt, 'base64'), decipher.final()])

// 	deciphered = PKCS7Decode(deciphered)

// 	const content = deciphered.slice(16)
// 	const length = content.slice(0, 4).readUInt32BE(0)

// 	return {
// 		message: JSON.parse(content.slice(4, length + 4).toString()),
// 		appId: content.slice(length + 4).toString()
// 	}
// }
// exports.main = async function(event, context) {
	

// 	if (true) {
// 		// 验证是从微信发来的消息
// 		if (true) {
// 			const decrypt = decryptMsg('PBP5QKIIcndLdU6Cy160TXMkWrFg3ijQszTKAPYAkua', '5vaKPNiscopq9Y3Y1CZGzew5kItCqe2RVY/Tw3YQ9689Ocom6fwfrvcT8EUY9HpnPV8qeb9Qcw0+lb9DQWXsAxC+MjXq36/C8FpECDMoQj/XovjGhh/JNou/Ym+cprQqdv4hcTEWaUOqo5gdwA9mGhrN/0T/q0K7fEvThK/grlP7HLi42wKcr0M7x8Me/dMgJfgyTQn1YvC6suFzBr15jDhtV8wR4lnVSzILoReCNPmmE3iQlj1q7KesxPAthEp7ZYTBtatwh+DcS/BZNlTeZp5bdbMgT/Sy7w2zWa2/Aseseum02/B/5jDA5kWTovC718cFiKONBPcW7A1yoF2rT2CXwWTByRVPZod36EPXUZ1/88M1UxvsA7ZXdJOal6iqa6ZGd4kjK+YDkMAC87h+PLGTnjHbIJUOQfR2LFi00ugh1Sle4QlucsVr3U4bphEF2pmuwgvcdF6Pr8bjQyGv9GfAYGxSkia4RWNSjrUNkiCCa7PWqPmplu/sSHvIznjEYEhxs5t2OxlHVYtUA2mDmCGVDvjb8ARDgT33VrLpz95sCFmF9pzERQCU+vvIl4PRKlDsskPpFWQxFHrujtAR/w==')
			
// 			console.log(decrypt)

// 			const result = decrypt.message
// 			// 只接收内容安全事件通知
// 			if (result.Event !== 'wxa_media_check') {
// 				return 'success'
// 			}

// 			if (result.result.suggest !== 'pass') {
// 				// 执行删除操作
// 				const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
// 					event,
// 					context
// 				})

// 				const updateRes = await dbJQL.collection('img-safe-review-log').where({
// 					traceId: result.trace_id
// 				}).update({
// 					status: 3
// 				})
				
// 				// console.log('123123123123', updateRes)
				
// 				// if (updateRes.updated === 0 || updateRes.code !== 0) {
// 				// 	return 'error'
// 				// }
				

// 				const imgData = await dbJQL.collection('img-safe-review-log').where({
// 					traceId: result.trace_id
// 				}).get()
				
// 				if (updateRes.code !== 0) {
// 					return 'error'
// 				}
				
// 				console.log(imgData)
				
// 				const data = imgData.data[0]
// 				uniCloud.deleteFile({
// 					fileList: [
// 						data.img_url // 阿里云fileID是url形式，例：https://xxx.com/xxx.png
// 					]
// 				}).then(imgres => {
// 					console.log(imgres)
// 				})
// 			}
// 		}
// 		return 'success'
// 	} else {
// 		return 'success'
// 	}


// }
