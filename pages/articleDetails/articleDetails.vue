<template>
	<view class="app-body-wrapper">
		<!-- 这里是状态栏 -->
		<!-- <view class="status_bar"></view> -->
		<!-- 返回工具栏 -->
		<!-- 顶部暗色区域 -->
		<view class="top-bg-menu"></view>
		<view class="top-menu">
			<view class="back" @click="back">
				<u-icon color="#ffffff" name="arrow-left" size="20"></u-icon>
			</view>
			<view class="menu"></view>
		</view>
		<u-sticky zIndex="0" bgColor="rgba(0,0,0,0)" offset-top="0">
			<!-- 相册 -->
			<u-swiper style="width: 100%;" height="80vh" imgMode="heightFix" :list="list3" indicator
				indicatorMode="line" circular :radius="0" interval="5000" bgColor="raba(0,0,0,0)"></u-swiper>
		</u-sticky>


		<!-- 评论区域 -->
		<view class="comment-wrapper">
			<!-- 标题 -->
			<view class="title-and-like">
				<view class="title">
					xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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
						<text>1.5K</text>
					</view>
					<view class="like">
						<u-icon name="heart-fill" color="#ffffff" size="18"></u-icon>
						<text>322喜欢</text>
					</view>
				</view>
				<view class="time">
					<u-icon name="clock-fill" color="#eeeeee" size="16"></u-icon>
					<text>2分钟前</text>
				</view>
			</view>
			<view class="" v-for="item in 1000" :key="item">
				{{ item }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list3: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/1.jpg'
				]
			}
		},
		onLoad(e) {
			console.log('传递的参数', e)
			uni.pageScrollTo({
				scrollTop: 100,
				duration: 0
			});
		},
		methods: {
			back() {
				uni.navigateBack(-1)
			},
			api_getarticleByid() {
				uniCloud.callFunction({
					name: 'get-article-byid',
					data: {
						id: e.id
					}
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
		height: 75rpx;
		position: fixed;
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
