<template>
	<scroll-view class="body-wrapper" :scroll-y="true">
		<view class="my-content-wrapper">
			<!-- 顶部组件 -->
			<view class="top-tool">
				<!-- 左侧菜单 -->
				<view class=""></view>
				<!-- 右侧菜单 -->
				<view class="right-tool">
					<view class="">
						<u-icon name="bell-fill" color="#ffffff" size="28"></u-icon>
					</view>
					<view style="margin-left: 40rpx;">
						<u-avatar src="/static/uniCloud-logo-1.png"></u-avatar>
					</view>
				</view>
			</view>
			<!-- 欢迎语 -->
			<!-- <view class="welcome-wrapper">
				<text>Hello</text>
				<text>撒打算打算</text>
			</view> -->

			<!-- 展览图 -->
			<view class="image-card">
				<u-grid :col="2" :border="false">
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
				</u-grid>
			</view>

			<!-- 广告 -->
			<view style="margin: 20rpx 0;">
				<u-swiper :list="list3" previousMargin="30" nextMargin="30" circular :autoplay="true" radius="5"
					bgColor="rgba(0,0,0,0)">
				</u-swiper>
			</view>
			

			<view class="image-card">
				<u-grid :col="2" :border="false">
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
					<u-grid-item>
						<draw-image></draw-image>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				list3: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	$bj-pd:0 40rpx; //边距
	
	.body-wrapper {
		// background-color: $sgw-theme-bg;
		background: $linear-theme-bg;
		color: #ffffff;
		height: 100vh;
	}

	.my-content-wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		margin: 0;
		width: 100%;
	}

	.top-tool {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin: $bj-pd;
		padding-bottom: 40rpx;
	}

	.right-tool {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.welcome-wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		margin: $bj-pd;
		margin-bottom: 30rpx;
	}

	.image-card {
		/* display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start; */
		margin: $bj-pd;
	}
</style>
