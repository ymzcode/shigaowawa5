<template>
	<view class="article-card">
		<view class="card my-img-bg card-just" @click="gotoDetils" :animation="animation1">
			<image style="width: 100%;height: 100%;" mode="widthFix" lazy-load
				src='https://cdn.uviewui.com/uview/album/1.jpg'></image>
			<!-- 顶/底部背景 -->
			<view class="top-shandow-bg"></view>
			<view class="bottom-shandow-bg"></view>
			<!-- 顶部文字标题 -->
			<view class="top-title">
				<u--text color="#ffffff" :lines="1" :text="cardData.title"></u--text>
			</view>
			<!-- 顶部设置按钮 -->
			<view class="top-setting" @click.stop="rotateFn(1)">
				<u-icon name="more-dot-fill" color="#ffffff" size="24"></u-icon>
			</view>
			<!-- 右下角分享 -->
			<view class="bottom-share" @click.stop="showShare">
				<button style="margin: 0;padding: 0;border: none;background: none;" :data-id="cardData._id" :data-title="cardData.title" :data-album="cardData.album" open-type="share">
					<u-icon name="share-square" color="#ffffff" size="24"></u-icon>
				</button>
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
		<view class="card card-back" :animation="animation2">
			<view class="right-back" @click="rotateFn(2)">
				<u-icon name="close-circle-fill" size="24"></u-icon>
			</view>
			<view class="back-title">
				<u--text :lines="2" :text="cardData.title"></u--text>
			</view>
			<view class="back-setting-btn">
				<u-button size="small" type="error" text="删除"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-article-card",
		data() {
			return {
				animation1: null,
				animation2: null,
				animationObj: null
			};
		},
		onShareAppMessage(res) {
			console.log(res)
			return {
				title: '自定义分享标题',
				path: `/pages/articleDetails/articleDetails?id=${this.cardData._id}`
			}
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
		},
		methods: {
			showShare() {
				// uni.showShareMenu({
				// 	withShareTicket: true,
				// 	menus: ['shareAppMessage', 'shareTimeline']
				// })
			},
			gotoDetils() {
				uni.navigateTo({
					url: `/pages/articleDetails/articleDetails?id=${this.cardData._id}`
				})
			},
			rotateFn(e) {
				this.animationObj = uni.createAnimation({
					duration: 1000,
					timingFunction: 'linear'
				})
				if (e === 1) {
					this.animation1 = this.animationObj.rotateY(180).step().export()
					this.animation2 = this.animationObj.rotateY(0).step().export()
				} else {
					this.animation1 = this.animationObj.rotateY(0).step().export()
					this.animation2 = this.animationObj.rotateY(180).step().export()
				}

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

		.card {
			transition: all 0.5s;
			backface-visibility: hidden;
			border-radius: 20rpx;
			overflow: hidden;
		}

		.card-just {}

		.card-back {
			transform: rotateY(-180deg);
			background-color: #ffffff;
			width: 100%;
			height: 100%;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.right-back {
			position: absolute;
			top: 10rpx;
			right: 10rpx;
		}

		.back-title {
			max-width: 400rpx;
		}

		.back-setting-btn {
			margin-top: 10rpx;
		}

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
			top: 0rpx;
			right: 0rpx;
			z-index: 2;
			padding: 10rpx 15rpx;
		}

		.bottom-share {
			position: absolute;
			bottom: 0rpx;
			right: 0rpx;
			z-index: 2;
			padding: 10rpx 15rpx;
			button {
				&::after {
					border: none;
				}
			}
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
