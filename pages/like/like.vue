<template>
	<view class="app-body-wrapper">

		<view v-if="noData || !isLogin" class="no-data">
			<lottie-like-no-data></lottie-like-no-data>
			<text>{{ !isLogin ? '登录后，再添加一个喜欢的作品吧' : '还没有喜欢的作品哦' }}</text>
			<u-button :customStyle="{
				width: '200rpx',
				marginTop: '20rpx'
			}" class="login-btn" v-if="!isLogin" text="登录" @click="gotoLogin"></u-button>
		</view>

		<view v-else class="my-favorite">
			<u-grid :col="2" :border="false">
				<u-grid-item v-for="item in articleArr" :key="item._id">
					<draw-image :resObject="item.article_id[0]"></draw-image>
				</u-grid-item>
			</u-grid>
			<u-loadmore :status="moreStatus" />
		</view>

	</view>
</template>

<script>
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'
	
	export default {
		data() {
			return {
				articleArr: [],
				page: 1,
				size: 10,
				moreStatus: 'loadmore'
			}
		},
		computed: {
			isLogin() {
				return uniCloud.getCurrentUserInfo().uid && this.userInfo
			},
			noData() {
				return this.articleArr.length === 0
			},
			userInfo() {
				return store.userInfo
			}
		},
		onShow() {
			uni.startPullDownRefresh()
		},
		onTabItemTap(e) {
			this.$store.dispatch('tabbar/changeTabbarIcon', e)
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			this.articleArr = []
			this.page = 1
			this.api_getFavorite()
		},
		onReachBottom() {
			this.api_getFavorite()
		},
		methods: {
			api_getFavorite() {
				if (!this.isLogin) {
					uni.stopPullDownRefresh();
					return
				}
				this.moreStatus = 'loading'
				this.$request('get-favorite-article', {
					page: this.page,
					size: this.size
				}).then(res => {
					console.log(res);
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
						
						if (res.count === 0) {
							this.articleArr = []
						} else {
							this.desNoData()
						}
					}
				}).catch(err => {
					console.error(err)
					uni.stopPullDownRefresh();
					this.moreStatus = 'loadmore'
				})
			},
			gotoLogin() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.my-favorite {
		display: flex;
		flex-direction: column;
	}

	.no-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 100rpx;

		text {
			color: #fff;
		}
	}
</style>
