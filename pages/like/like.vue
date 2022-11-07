<template>
	<view class="app-body-wrapper">
		<u-empty mode="favor" text="还没有喜欢的作品">
		</u-empty>
		
		<u-upload :fileList="albumArr" @afterRead="afterRead" accept="image" @delete="deletePic"
			sizeType="compressed" name="3" multiple :maxCount="9">
		</u-upload>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				albumArr: [],
			}
		},
		onTabItemTap(e) {
			this.$store.dispatch('tabbar/changeTabbarIcon', e)
		},
		methods: {
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
			async submit() {
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
			}
		}
	}
</script>

<style>

</style>
