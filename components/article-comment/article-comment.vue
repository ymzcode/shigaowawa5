<template>
	<view class="wrapper">
		<comment-card style="width: 100%;" v-for="item in commentArr" :key="item._id" :commentData="item"></comment-card>
		<u-loadmore :status="loadmoreStatus" />
		<!-- 占位 -->
		<view style="height: 160rpx;"></view>
	</view>
</template>

<script>
	export default {
		name: "article-comment",
		data() {
			return {
				commentSize: 10,
				commentPage: 1,
				id: '',
				commentArr: [],
				commentCount: 0,
				loadmoreStatus: 'loadmore'
			};
		},
		computed: {
			isLogin() {
				return uniCloud.getCurrentUserInfo().uid
			}
		},
		methods: {
			next() {
				this.loadmoreStatus = 'loading'
				this.getCommentContent()
			},
			init(id) {
				this.id = id
				this.getCommentContent()
			},
			getCommentContent() {
				this.$request('article-comment', {
					action: 'get',
					page: this.commentPage,
					size: this.commentSize,
					id: this.id
				}).then(res => {
					console.log(res)
					if (res.code === 0) {
						this.commentCount = res.count
						this.commentArr = this.commentArr.concat(res.data)
						if (res.data.length > 0) {
							this.commentPage++
						}
						if (res.data.length < this.commentSize) {
							this.loadmoreStatus = 'nomore'
						} else {
							this.loadmoreStatus = 'loadmore'
						}
						this.$emit('getCommentCount', this.commentCount)
					}
				})
			},
			getCommentCount() {
				return this.commentCount
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		padding-left: 50rpx;
		padding-right: 50rpx;
	}
</style>
