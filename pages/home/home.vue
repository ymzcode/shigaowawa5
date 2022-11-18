<template>
	<view class="app-body-wrapper">
		<view class="my-content-wrapper">
			<!-- 顶部组件 -->
			<view class="top-tool">
				<!-- 左侧菜单 -->
				<view class=""></view>
				<!-- 右侧菜单 -->
				<view class="right-tool">
					<!-- <view>
						<u-icon name="bell-fill" color="#ffffff" size="28"></u-icon>
					</view> -->
					<view style="margin-left: 40rpx;">
						<u-avatar size="35" :src="userInfo.avatar_file.url" @click="gotoUser"></u-avatar>
					</view>
				</view>
			</view>
			<!-- 欢迎语 -->
			<view class="welcome-wrapper">
				<view class="hello-wrapper">
					<lottie-home-hello></lottie-home-hello>
				</view>
				<!-- <text>{{userInfo.nickname}}</text> -->
			</view>

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
				<u-swiper :list="bannerAd" previousMargin="30" nextMargin="30" circular :autoplay="true" radius="5"
					bgColor="rgba(0,0,0,0)" @click="clickSwiper">
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

		<u-loadmore :status="moreStatus" />

		<view style="height: 200rpx;width: 100%;"></view>
	</view>
</template>

<script>
	import lottie from 'lottie-miniprogram'
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'

	export default {
		data() {
			return {
				bannerAd: [],
				// 列表数据
				articleArr: [],
				refresherTriggered: false,
				page: 1,
				size: 10,
				moreStatus: 'loadmore',
				adArr: []
			}
		},
		computed: {
			userInfo() {
				return store.userInfo
			}
		},
		onTabItemTap(e) {
			this.$store.dispatch('tabbar/changeTabbarIcon', e)
		},
		created() {
			this.api_getArticle()
			this.api_getHomeBannerAd()
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			this.articleArr = []
			this.page = 1
			this.api_getArticle()
		},
		onReachBottom() {
			console.log('chudichudi');
			this.api_getArticle()
		},
		methods: {
			clickSwiper(e) {
				console.log(e);
				const data = this.adArr[e]
				if (data.type === 'navigateToMiniProgram' && data.name === 'DIYSHOP') {
					uni.navigateToMiniProgram({
						appId: 'wxa2b21df27888b50f',
						fail: (err) => {
							console.error(err);
						}
					})
				}
			},
			gotoUser() {
				if (this.userInfo._id) {
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo?showLoginManage=true'
					})
				} else {
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd'
					})
				}
			},
			api_getHomeBannerAd() {
				this.$request('get-home-banner-ad', {}).then(res => {
					console.log(res);
					if (res.code === 0) {
						this.bannerAd = res.data.map(item => item.img)
						this.adArr = res.data
					}
				})
			},
			api_getArticle() {
				this.moreStatus = 'loading'
				this.$request('home-get-article', {
					page: this.page,
					size: this.size
				}).then(res => {
					console.log(res)
					uni.stopPullDownRefresh();
					if (res.code === 0) {
						this.articleArr = this.articleArr.concat(res.data)
						if (res.data.length > 0) {
							this.page++
						}
						if (res.data.length < this.size) {
							this.moreStatus = 'nomore'
						} else {
							this.moreStatus = 'loadmore'
						}
					}
				}).catch(err => {
					uni.stopPullDownRefresh();
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
		position: relative;
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
		position: absolute;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		margin: $bj-pd;
		margin-bottom: 30rpx;

		.hello-wrapper {
			width: 100px;
			height: 40px;
			position: relative;
			overflow: hidden;
		}
		
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
