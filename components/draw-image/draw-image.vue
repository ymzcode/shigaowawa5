<template>
	<view class="draw-image">
		<view class="image-card-body">
			<u--image width='320rpx' height='320rpx' :radius="20" :src="firstImage" :fade="true" duration="450"></u--image>
			<!-- 红心 -->
			<view v-if="isShowLike" class="like-btn">
				<u-icon name="heart-fill" color="#ffffff" size="28"></u-icon>
			</view>
		</view>
		<!-- 描述 -->
		<view class="card-tip-show">
			<view class="read">
				<text style='margin-right: 10rpx;'>{{ resObject.view_count || 0 }}</text>
				<u-icon name="eye" color="#ffffff"></u-icon>
			</view>
			<view class="like">
				<text style='margin-right: 10rpx;'>{{ resObject.like_count || 0 }}喜欢</text>
				<u-icon name="heart" color="#ffffff"></u-icon>
			</view>
		</view>
		<!-- 标题 -->
		<view>
			<text class="card-title">{{ resObject.title }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"draw-image",
		data() {
			return {
				
			};
		},
		props: {
			// 是否展示喜欢
			isShowLike: {
				type: Boolean,
				default: true
			},
			// resObject
			resObject: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		computed: {
			// 相册数组
			imageArr() {
				if (this.resObject.album) {
					return this.resObject.album.split(',')
				}
				return []
			},
			// 首页展示图
			firstImage() {
				return this.imageArr[0]
			}
		}
	}
</script>

<style scoped lang="scss">
.draw-image {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 10rpx 8rpx;
	overflow: hidden;
}
.image-card-body {
	display: flex;
	position: relative;
}
.like-btn {
	position: absolute;
	top: 30rpx;
	left: 30rpx;
}
.card-title {
	font-size: 36rpx;
	color: #ffffff;
	word-break: break-all;
}

.card-tip-show {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	font-size: 30rpx;
	margin-top: 10rpx;
	width: 100%;
	.read {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.like {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
}
</style>