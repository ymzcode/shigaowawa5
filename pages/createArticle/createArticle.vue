<template>
	<scroll-view class="body-wrapper" :scroll-y="true">
		<view class="content-wrapper">
			<u--input placeholder="给你的作品起一个名字吧" border="surround" v-model="title" @change="titleChange" color='#ffffff'
				clearable>
			</u--input>

			<view @click="onShowCategory">
				<u--input :customStyle="{
					margin: '20rpx 0'
				}" placeholder="选择作品的分类" readonly border="surround" v-model="categoryText" color='#ffffff'>
				</u--input>
			</view>


			<u-picker :show="showCategory" ref="uPicker" keyName="label" :columns="columns" @confirm="confirm"
				closeOnClickOverlay @cancel="showCategory = false" @close="showCategory = false">
			</u-picker>



			<!-- <u-button type="primary" text="上传文件" @click="upload"></u-button> -->
			<view>
				<u-upload :fileList="albumArr" @afterRead="afterRead" accept="image" @delete="deletePic"
					sizeType="compressed" name="3" multiple :maxCount="9">
				</u-upload>
			</view>

			<u-button type="primary" text="发布" @click="submit"></u-button>
			<u-button type="primary" text="重置" @click="reSet"></u-button>
			<navigator open-type="navigate" url="/uni_modules/uni-id-pages/pages/login/login-withoutpwd">
				<u-button type="primary" text="注册"></u-button>
			</navigator>
			
		</view>
	</scroll-view>
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
						label: '流体',
						id: '63609863702e9d0001d5a7f0'
					}, {
						label: '其他',
						id: '6360987abf704d00012e6afa'
					}]
				]
			};
		},
		onShow() {
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
				console.log(111);
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
			checkForm() {
				if (uni.$u.trim(this.title) === '') {
					uni.showToast({
						title: '请填写完整的作品名称',
						icon: 'none'
					})
					return false
				}
				if (this.category === '') {
					uni.showToast({
						title: '请选择作品的分类',
						icon: 'none'
					})
					return false
				}
				if (this.albumArr.length === 0) {
					uni.showToast({
						title: '请上传至少一张个人作品',
						icon: 'none'
					})
					return false
				}
				return true
			},
			async submit() {
				console.log('tijiao');
				if (!this.checkForm()) {
					return
				}
				// promise方式
				let processAll = []
				this.albumArr.map(item => {
					const uploadResult = uniCloud.uploadFile({
						filePath: item.thumb,
						cloudPath: 'a.jpg',
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


				return await uniCloud.callFunction({
					name: 'create-article',
					data: {
						album: album,
						title: this.title,
						category_id: this.category
					}
				}).then(res => {
					console.log(res)
					if (res.result.code === 0) {
						uni.navigateBack(-1)
						uni.showToast({
							title: '发布成功',
							icon: 'none'
						})
					}
				}).catch(err => {
					uni.showToast({
						title: err.toString(),
						icon: 'none'
					})
					console.error(err)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.body-wrapper {
		background: $linear-theme-bg;
		color: #ffffff;
		height: 100vh;
	}

	.content-wrapper {
		padding: 0 40rpx;
	}

	.upload-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
