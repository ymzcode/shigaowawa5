<template>
	<view class="app-body-wrapper create-wrapper">
		<lottie-create-article-step v-if="!showCategory" ></lottie-create-article-step>
		<scroll-view :scroll-y="true" style="height: 100vh;">
			<view class="content-wrapper">
				<text class="tip">{{ textTip }}</text>
				<view>
					<u-upload class="upload-wrapper" :fileList="albumArr" @afterRead="afterRead" accept="image"
						@delete="deletePic" :sizeType="['compressed']" name="3" multiple :maxCount="9">
					</u-upload>
				</view>

				<u--input v-if="albumArr.length > 0" placeholder="给你的作品起一个名字吧" border="surround" v-model="title"
					@change="titleChange" color='#ffffff' clearable :maxlength="25" showWordLimit>
				</u--input>

				<view v-if="albumArr.length > 0" @click="onShowCategory">
					<u--input :customStyle="{
						margin: '20rpx 0'
					}" placeholder="选择作品的分类" readonly border="surround" v-model="categoryText" color='#ffffff'>
					</u--input>
				</view>

				<u-button v-if="checkForm(false)" type="primary" text="发布" @click="submit"></u-button>
			</view>

			<u-picker :show="showCategory" ref="uPicker" keyName="label" :columns="columns" @confirm="confirm"
				closeOnClickOverlay @cancel="showCategory = false" @close="showCategory = false">
			</u-picker>
				
			<view style="height: 30vh;">
				
			</view>
			
			<!-- <u-button type="primary" text="重置" @click="reSet"></u-button> -->

		</scroll-view>
	</view>
</template>

<script>
	import loginUtils from '@/utils/login-common.js'
	export default {
		data() {
			return {
				albumArr: [],
				title: '',
				category: '',
				categoryText: '',
				showCategory: false,
				columns: [
					[{
						label: '石膏娃娃',
						id: '63609853548ef40001a0dd7f'
					}, {
						label: '其他',
						id: '6360987abf704d00012e6afa'
					}]
				],
				showSuccess: false
			};
		},
		computed: {
			textTip() {
				if (this.albumArr.length === 0) {
					return '简单两步即可上传你的作品，首先先上传作品照片吧'
				}
				if (this.title === '' || this.category === '') {
					return '现在完成最后一步，给作品起一个名字吧'
				}
			}
		},
		onLoad() {
			loginUtils.checkLogin()
		},
		methods: {
			reSet() {
				this.albumArr = []
				this.category = ''
				this.categoryText = ''
				this.title = ''
			},
			onShowCategory() {
				this.showCategory = true
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e)
				this.categoryText = e.value[0].label
				this.category = e.value[0].id
				this.showCategory = false
			},
			titleChange(e) {
				console.log(e);
			},
			afterRead(event) {
				console.log(event);
				let lists = [].concat(event.file)
				let fileListLen = this.albumArr.length
				console.log(lists, fileListLen);
				this.albumArr = [...this.albumArr, ...lists]
			},
			deletePic(event) {
				console.log(event);
				this.albumArr.splice(event.index, 1)
			},
			upload() {
				function cropImg(file) {
					return new Promise((resolve, reject) => {
						let ext
						let filePathProcessed = file.path // 处理结果
						// #ifdef H5
						ext = file.name.split('.').pop()
						resolve({
							path: filePathProcessed,
							ext,
							fileType: file.fileType
						})
						// #endif
						// #ifndef H5
						uni.getImageInfo({
							src: file.path,
							success(info) {
								ext = info.type.toLowerCase()
								resolve({
									path: filePathProcessed,
									ext,
									fileType: file.fileType
								})
							},
							fail(err) {
								reject(new Error(err.errMsg || '未能获取图片类型'))
							}
						})
						// #endif
					})
				}

				uniCloud.chooseAndUploadFile({
					type: 'image',
					sizeType: 'compressed',
					onChooseFile(res) {
						const processAll = []
						for (let i = 0; i < res.tempFiles.length; i++) {
							processAll.push(cropImg(res.tempFiles[i]))
						}
						return Promise.all(processAll).then((fileList) => {
							let result = {
								tempFilePaths: []
							}
							result.tempFiles = fileList.map((fileItem, index) => {
								result.tempFilePaths.push(fileItem.path)
								return {
									path: fileItem.path,
									cloudPath: '' + Date.now() + index + '.' + fileItem
										.ext, // 云端路径，这里随便生成了一个
									fileType: fileItem.fileType
								}
							})
							return result
						})
					},
					onUploadProgress(data) {
						console.log('jindu', data)
					}
				}).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
					uni.showToast({
						title: err.errMsg,
						icon: 'none'
					})
				})
			},
			// 检查必填项
			checkForm(flag = true) {
				if (uni.$u.trim(this.title) === '') {
					flag && uni.showToast({
						title: '请填写完整的作品名称',
						icon: 'none'
					})
					return false
				}
				if (this.category === '') {
					flag && uni.showToast({
						title: '请选择作品的分类',
						icon: 'none'
					})
					return false
				}
				if (this.albumArr.length === 0) {
					flag && uni.showToast({
						title: '请上传至少一张个人作品',
						icon: 'none'
					})
					return false
				}
				return true
			},
			async submit() {
				if (!this.checkForm()) {
					return
				}
				uni.showLoading({
					title: '发布中···',
					mask: true,
				})
				// promise方式
				let processAll = []
				this.albumArr.map(item => {
					const uploadResult = uniCloud.uploadFile({
						filePath: item.thumb,
						cloudPath: `${uniCloud.getCurrentUserInfo().uid}-${Date.now()}${item.thumb.substring(item.thumb.lastIndexOf('.'))}`,
						fileType: 'image',
						onUploadProgress: function(progressEvent) {
							// console.log(progressEvent);
							var percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							);
						}
					})
					processAll.push(uploadResult)
				})

				let album = ''

				const RES = await Promise.all(processAll).then(fileList => {
					console.log(fileList);
					album = fileList.map(item => item.fileID).toString()
				})

				await this.$request('create-article', {
					album: album,
					title: this.title,
					category_id: this.category
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if (res.code === 0) {
						// this.showSuccess = true
						uni.navigateBack(-1)
						uni.showToast({
							title: '发布成功',
							icon: 'none'
						})
					}
				}).catch(err => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.create-wrapper {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		position: relative;
	}

	.content-wrapper {
		padding: 0 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 9;

		.tip {
			font-size: 30rpx;
			margin-top: 10rpx;
			margin-bottom: 30rpx;
		}
	}

	.upload-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
