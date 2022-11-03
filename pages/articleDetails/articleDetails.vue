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
		<u-sticky zIndex="0" bgColor="rgba(0,0,0,0)" offset-top="0">
			<!-- 相册 -->
			<u-swiper :loading="swiperLoading" style="width: 100%;" height="80vh" imgMode="heightFix" :list="album" indicator
				indicatorMode="line" circular :radius="0" interval="5000" bgColor="raba(0,0,0,0)"></u-swiper>
		</u-sticky>


		<!-- 评论区域 -->
		<view class="comment-wrapper">
			<view class="comment-top-tag">
				<u-icon :name="commentTopTag" color="#eeeeee" size="20"></u-icon>
			</view>
			<!-- 标题 -->
			<view class="title-and-like">
				<view class="title">
					{{ articleInfo.title }}
				</view>
				<view class="like">
					<u-icon name="heart-fill" color="#ffffff" size="34"></u-icon>
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
					<u-icon name="clock-fill" color="#eeeeee" size="16"></u-icon>
					<text>{{ publish_date }}</text>
				</view>
			</view>
			<view class="" v-for="item in 1000" :key="item">
				{{ item }}
			</view>
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
				commentTopTag: 'minus'
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
		onLoad(e) {
			console.log('传递的参数', e)
			if (!e.id) {
				this.errorPage = true
			}
			this.id = e.id
			uni.pageScrollTo({
				scrollTop: 100,
				duration: 0
			});
			this.api_getarticleByid()
		},
		methods: {
			back() {
				uni.navigateBack(-1)
			},
			api_getarticleByid() {
				this.swiperLoading = true
				uniCloud.callFunction({
					name: 'get-article-byid',
					data: {
						id: this.id
					}
				}).then(res => {
					console.log(res)
					this.swiperLoading = false
					if (res.result.code === 0) {
						this.articleInfo = res.result.data[0]
					}
				}).catch(err => {
					this.swiperLoading = false
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
