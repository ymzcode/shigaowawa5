<template>
	<view class="article-card">
		<view class="my-img-bg">
			<image lazy-load src='https://cdn.uviewui.com/uview/album/1.jpg'></image>
			<!-- 顶/底部背景 -->
			<view class="top-shandow-bg"></view>
			<view class="bottom-shandow-bg"></view>
			<!-- 顶部文字标题 -->
			<view class="top-title">
				<u--text color="#ffffff" :lines="1" :text="cardData.title"></u--text>
			</view>
			<!-- 顶部设置按钮 -->
			<view class="top-setting">
				<u-icon name="more-dot-fill" color="#ffffff" size="24"></u-icon>
			</view>
			<!-- 右下角分享 -->
			<view class="bottom-share">
				<u-icon name="share-square" color="#ffffff" size="24"></u-icon>
			</view>
			<!-- 左下角查看/评论 -->
			<view class="left-read">
				<u-icon name="eye" color="#ffffff" size="14"></u-icon>
				<text>{{ view_count }}</text>
				<text style="width: 20rpx;"></text>
				<u-icon name="heart-fill" color="#ffffff" size="14"></u-icon>
				<text>{{ like_count }}</text>
				<text style="width: 20rpx;"></text>
				<u-icon name="clock" color="#ffffff" size="14"></u-icon>
				<text>{{ publish_date }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-article-card",
		data() {
			return {

			};
		},
		computed: {
			// 发表时间
			publish_date() {
				return uni.$u.timeFrom(this.cardData.publish_date)
			},
			view_count() {
				return this.cardData.view_count || 0
			},
			like_count() {
				return this.cardData.like_count || 0
			},
		},
		props: {
			cardData: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style scoped lang="scss">
	.article-card {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		overflow: hidden;
		position: relative;
		margin: 20rpx 30rpx;
		height: 300rpx;

		.my-img-bg {
			position: absolute;
			z-index: 0;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
		}

		.top-shandow-bg {
			width: 100%;
			height: 80rpx;
			position: absolute;
			top: 0;
			z-index: 1;
			background: linear-gradient(rgba(50, 53, 56, 0.3), rgba(0, 0, 0, 0));
		}

		.bottom-shandow-bg {
			width: 100%;
			height: 80rpx;
			position: absolute;
			bottom: 0;
			z-index: 1;
			background: linear-gradient(rgba(0, 0, 0, 0), rgba(50, 53, 56, 0.3));
		}

		.top-title {
			position: absolute;
			top: 10rpx;
			left: 10rpx;
			z-index: 2;
			max-width: 500rpx;
		}

		.top-setting {
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			z-index: 2;
		}

		.bottom-share {
			position: absolute;
			bottom: 10rpx;
			right: 10rpx;
			z-index: 2;
		}
		
		.left-read {
			position: absolute;
			bottom: 10rpx;
			left: 10rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			z-index: 2;
			text {
				color: #ffffff;
				font-size: 28rpx;
				margin-left: 10rpx;
			}
		}
	}
</style>
