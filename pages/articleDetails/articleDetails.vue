<template>
	<view v-if="!errorPage" class="app-body-wrapper">
		<!-- 这里是状态栏 -->
		<!-- <view class="status_bar"></view> -->
		<!-- 返回工具栏 -->
		<!-- 顶部暗色区域 -->
		<!-- <view class="top-bg-menu"></view> -->
		<view class="top-menu">
			<view class="back" @click="back">
				<u-icon color="#ffffff" name="arrow-left" size="20"></u-icon>
			</view>
			<view class="menu"></view>
		</view>
		<view style="height: 80vh;"></view>
		<view class="swiper-fixed-wrapper">
			<!-- 相册 -->
			<u-swiper :loading="swiperLoading" style="width: 100%;" height="80vh" imgMode="heightFix" :list="album"
				indicator indicatorMode="line" circular :radius="0" interval="5000" bgColor="raba(0,0,0,0)"></u-swiper>
		</view>


		<!-- 评论区域 -->
		<view class="comment-wrapper">
			<!-- 评论输入框 -->
			<view class="comment-top-tag">
				<u-icon :name="commentTopTag" color="#eeeeee" size="20"></u-icon>
			</view>
			<!-- 标题 -->
			<view class="title-and-like">
				<view class="title">
					{{ articleInfo.title || '' }}
				</view>
				<view class="like" @click="onClickLike">
					<u-icon name="heart-fill" :color="`${isLike ? '#eb4b42' : '#ffffff'}`" size="34"></u-icon>
				</view>
			</view>
			<!-- 文章信息 -->
			<view class="article-tip">
				<view class="tip-left">
					<view class="read">
						<u-icon name="eye" color="#ffffff" size="18"></u-icon>
						<text>{{ view_count }}</text>
					</view>
					<view class="like">
						<u-icon name="heart-fill" color="#ffffff" size="18"></u-icon>
						<text>{{ like_count }}喜欢</text>
					</view>
				</view>
				<view class="time">
					<u-icon name="clock-fill" color="#eeeeee" size="14"></u-icon>
					<text>{{ publish_date }}</text>
				</view>
			</view>
			<!-- 评论统计 -->
			<view class="comment-count-wrapper">
				<u-icon name="chat" color="#eeeeee" size="24"></u-icon>
				<text>评论 ({{ commentCount }})</text>
			</view>
			<u-sticky zIndex="2" bgColor="rgba(0,0,0,0)" :offset-top="offsetTop">
				<view class="comment-input-wrapper">
					<view class="comment-main-bg">
						<u-input v-model="commentText" type='text' placeholder="发表评论" prefixIcon="chat-fill"
							prefixIconStyle="font-size: 22px;color: #909399" border="none" maxlength="300" clearable
							color="#ffffff">
							<template slot="suffix">
								<u-button v-if="commentText" type="primary" size="mini" text="发送"
									@click="sendCommentContent"></u-button>
							</template>
						</u-input>
					</view>
				</view>
			</u-sticky>
			<article-comment style="margin-top: -100rpx;" ref="articleComment" @getCommentCount="getCommentCount">
			</article-comment>
			
		</view>
	</view>
	<view v-else class="app-body-wrapper" style="justify-content: center;align-items: center;">
		<u-navbar bgColor="#323538" leftIconColor="#ffffff" :autoBack="true">
		</u-navbar>
		<u-empty mode="data"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				errorPage: false,
				articleInfo: {},
				swiperLoading: true,
				commentTopTag: 'minus',
				likeInfo: [],
				commentText: '',
				// 评论数量
				commentCount: 0
			}
		},
		computed: {
			// 发表时间
			publish_date() {
				return uni.$u.timeFrom(this.articleInfo.publish_date)
			},
			view_count() {
				return this.articleInfo.view_count || 0
			},
			like_count() {
				return this.articleInfo.like_count || 0
			},
			album() {
				if (this.articleInfo.album) {
					return this.articleInfo.album.split(',')
				}
				return []
			},
			isLike() {
				return this.likeInfo.length > 0
			},
			isLogin() {
				return uniCloud.getCurrentUserInfo().uid
			},
			offsetTop() {
				return uni.getSystemInfoSync().windowHeight - 66
			}
		},
		onPageScroll(e) { //nvue暂不支持滚动监听，可用bindingx代替
			// console.log("滚动距离为：" + e.scrollTop);
			// console.log(e);
			if (e.scrollTop <= 8 && this.commentTopTag === 'minus') {
				this.commentTopTag = 'arrow-up'
			} else if (this.commentTopTag !== 'minus' && e.scrollTop > 8) {
				this.commentTopTag = 'minus'
			}
		},
		onReachBottom(e) {
			console.log('aaaaaa');
			this.$refs.articleComment.next()
		},
		onLoad(e) {
			console.log('传递的参数', e)
			console.log(this.isLogin)
			if (!e.id) {
				this.errorPage = true
			}
			this.id = e.id
			uni.pageScrollTo({
				scrollTop: 100,
				duration: 0
			});
			this.api_getarticleByid()

			if (this.isLogin) {
				this.api_getFavoriteArticleByid()
			}

			this.$refs.articleComment.init(this.id)
		},
		methods: {
			getCommentCount(count) {
				this.commentCount = count
			},
			sendCommentContent() {
				if (!this.isLogin) {
					uni.showToast({
						title: '请登录后操作',
						icon: 'none'
					})
					return
				}
				if (this.commentText == '' || uni.$u.trim(this.commentText, 'all') == '') {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					})
					return
				}
				uni.$u.throttle(this.api_articleComment('add', {
					action: 'add',
					id: this.id,
					comment_content: this.commentText
				}), 2000)
			},
			api_articleComment(action, data) {
				this.$request('article-comment', data).then(res => {
					console.log(res)
					if (res.code === 0) {
						uni.showToast({
							title: '发表成功',
							icon: 'none'
						})
						this.commentText = ''
					}
				})
			},
			onClickLike() {
				if (this.isLogin) {
					this.api_targetFavorite()
				} else {
					uni.showToast({
						title: '请登录后操作',
						icon: 'none'
					})
				}
			},
			api_getFavoriteArticleByid() {
				this.$request('get-favorite-article-byid', {
					id: this.id
				}).then(res => {
					console.log(res)
					if (res.code === 0) {
						this.likeInfo = res.data
					}
				})
			},
			api_targetFavorite() {
				this.$request('target-favorite-article', {
					id: this.id
				}).then(res => {
					console.log(res)
					uni.showToast({
						title: this.isLike ? '取消喜欢成功' : '添加喜欢成功',
						icon: 'none'
					})
					this.api_getFavoriteArticleByid()
				})
			},
			back() {
				uni.navigateBack(-1)
			},
			api_getarticleByid() {
				this.swiperLoading = true
				this.$request('get-article-byid', {
					id: this.id
				}).then(res => {
					this.swiperLoading = false
					if (res.code === 0) {
						this.articleInfo = res.data[0]
					}
				}).catch(err => {
					this.swiperLoading = false
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.comment-count-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 30rpx 0;

		text {
			margin-left: 20rpx;
			font-size: 34rpx;
		}
	}

	.comment-input-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;

		.comment-main-bg {
			width: 550rpx;
			background-color: #3a3a3a;
			padding: 20rpx 30rpx;
			border-radius: 40rpx;
		}
	}

	.swiper-fixed-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 0;
	}

	.comment-wrapper {
		display: flex;
		flex-direction: column;
		background: linear-gradient(rgba(50, 53, 56, 0.5), rgba(0, 0, 0, 1));
		backdrop-filter: blur(10px);
		width: 100%;
		border-top-left-radius: 100rpx;
		border-top-right-radius: 100rpx;
		position: relative;
		z-index: 1;
		padding-top: 50rpx;
		padding-bottom: 100rpx;

		>view {
			padding-left: 50rpx;
			padding-right: 50rpx;
		}

		.comment-top-tag {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
		}

		.title-and-like {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;

			.title {
				max-width: 450rpx;
				word-break: break-all;
			}

			.like {}
		}

		.article-tip {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-between;
			margin: 30rpx 0;

			text {
				font-size: 30rpx;
				margin-left: 10rpx;
			}

			.tip-left {
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.read {
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.like {
				margin-left: 50rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.time {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #eeeeee;

				text {
					font-size: 26rpx;
				}
			}
		}
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.top-bg-menu {
		position: absolute;
		background: linear-gradient(rgba(50, 53, 56, 0.3), rgba(0, 0, 0, 0));
		top: 0;
		z-index: 2;
		width: 100%;
		height: 75rpx;
		padding-top: var(--status-bar-height);
	}

	.top-menu {
		display: flex;
		align-items: flex-end;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		width: 100%;
		height: 110rpx;
		position: fixed;
		background: linear-gradient(rgba(50, 53, 56, 0.3), rgba(0, 0, 0, 0));
		top: 0;
		padding-top: var(--status-bar-height);
		z-index: 2;

		.back {
			margin-left: 30rpx;
			padding: 20rpx;
		}

		.menu {
			margin-right: 30rpx;
		}
	}
</style>
