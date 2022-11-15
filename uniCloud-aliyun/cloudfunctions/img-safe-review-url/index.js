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
// exports.main = function(event, context) {
// 	const {
// 		signature: signature,
// 		timestamp: timestamp,
// 		nonce: nonce,
// 		echostr: echostr
// 	} = event.queryStringParameters


// 	let body = ''
// 	if (event.body !== '') {
// 		body = JSON.parse(event.body)
// 	}
// 	let result = body

// 	const tmpStr = getSignature('19971116', timestamp, nonce)

// 	if (signature === tmpStr) {
// 		// 验证是从微信发来的消息
// 		if (body.Encrypt) {
// 			const decrypt = decryptMsg('PBP5QKIIcndLdU6Cy160TXMkWrFg3ijQszTKAPYAkua', body.Encrypt)

// 			result = decrypt.message
// 			// 只接收内容安全事件通知
// 			if (result.Event !== 'wxa_media_check') {
// 				return 'success'
// 			}

// 			if (result.result.suggest !== 'pass') {
// 				// 执行删除操作
// 				console.log('shanchuhuhuhuhuhuhuh')
// 			}
// 		}
// 		return 'success'
// 	} else {
// 		return 'success'
// 	}


// }



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
exports.main = function(event, context) {

	if (true) {
		// 验证是从微信发来的消息
		const Encrypt = 'bEabR13WwS1JQO3MEGuLiv3oVsixMbtBq/qBWwQVcBzZzVLBOUV5Csn4cyXw99+7xHJAW36oej0IswOYHxY0WXYfEu/RmBR+VMxCwCe/7+TRVv7e9rMKFuLNMn/wqPlJaJuhPb52uNHXfTFZhr9WXIsLNJTbD+N95zuIeVEKo2c+hywbyYoZeEFRv7lOd/HPNwPYykrEPHNQ+q9EMjkTVnGPsMal8c84UsHUNrOz89DDdtemTf+eW4LFbFZQ75THhVteOPloPt6S8HVMMz0X47N1CKYeX507x5rQ1FJJCjh3+pus8u7Ec5ifyRONTrF1LUkmNzusnsIgoNAGsaEfSdOms2MjwwJMbMNf9TScDEq+pkFxnqFujrQu2HjIgUkMb0iUxyzM0zYqmFzsIyYd+LD1y7kj6epcADhDRfEIEKZI7yKxtlHdn5aUSztS6um/grJ1kGL1n/IP1munGfGKC7J1HWq1+XhJEZvjA/3Aswuxb/x4OR/LtDdd5APGmOpEGMvAG6JUTipQqwypNRRgUotF7TNBdkiw3VrnkELDpYqXBECDchbz/Q9Byutvx8PtgjbWebrKh4Ouxv0sYEmpGA=='
		if (true) {
			const decrypt = decryptMsg('PBP5QKIIcndLdU6Cy160TXMkWrFg3ijQszTKAPYAkua', Encrypt)
			console.log(decrypt)
			result = decrypt.message
			// 只接收内容安全事件通知
			if (result.Event !== 'wxa_media_check') {
				return 'success'
			}

			if (result.result.suggest !== 'pass') {
				// 执行删除操作
				console.log('shanchuhuhuhuhuhuhuh')
			}
		}
		return 'success'
	} else {
		return 'success'
	}


}
