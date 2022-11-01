<template>
	<view class="body-wrapper">
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
					<u-grid-item v-for="item in articleArr.slice(0,2)" :key="item._id">
						<draw-image :resObject="item"></draw-image>
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
					<u-grid-item v-for="item in articleArr.slice(2)" :key="item._id">
						<draw-image :resObject="item"></draw-image>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list3: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
				// 列表数据
				articleArr: [],
				refresherTriggered: false,
				page: 1,
				size: 10
			}
		},
		created() {
			this.api_getArticle()
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				this.articleArr = []
				this.page = 1
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			console.log('chudichudi');
			this.api_getArticle()
		},
		methods: {
			api_getArticle() {
				uniCloud.callFunction({
					name: 'home-get-article',
					data: {
						page: this.page,
						size: this.size
					}
				}).then(res => {
					console.log(res)
					if (res.result.code === 0) {
						this.articleArr = this.articleArr.concat(res.result.data)
						if (res.result.data.length > 0) {
							this.page++
						}
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
	$bj-pd:0 40rpx; //边距

	.body-wrapper {
		display: flex;
		flex-direction: column;
		// background-color: $sgw-theme-bg;
		background: $linear-theme-bg;
		color: #ffffff;
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
