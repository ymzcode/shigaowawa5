<template>
	<view class="app-body-wrapper">
		<view v-if="noData || !isLogin" class="no-data">
			<lottie-my-article-no-data></lottie-my-article-no-data>
			<text>{{ !isLogin ? '登录后，才可以分享自己的作品哦' : '快来分享自己的第一个作品吧' }}</text>
			<u-button :customStyle="{
				width: '200rpx',
				marginTop: '20rpx'
			}" class="login-btn" v-if="!isLogin" text="登录" @click="gotoLogin"></u-button>
		</view>


		<view v-else class="article-card-wrapper">
			<view class="article-card-add" @click="create">
				<u-icon name="plus-circle-fill" color="#ffffff" size="30"></u-icon>
				<text class="top-tip">分享你的新创作</text>
			</view>

			<my-article-card v-for="item in articleArr" :key="item._id" :cardData="item" @refshData="refshData"></my-article-card>
			
			<u-loadmore :status="moreStatus" />
			<view style="width: 100%;height: 100rpx;"></view>
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
		onShareAppMessage(res) {
			console.log(res)
			if (res.from === 'button') {
				const message = res.target.dataset
				return {
					title: `[DIY手工展览馆] - ${message.title}`,
					imageUrl: message.album.split(',')[0],
					path: `/pages/articleDetails/articleDetails?id=${message.id}`
				}
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
		// 下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			this.articleArr = []
			this.page = 1
			this.api_getMyArticle()
		},
		onReachBottom() {
			this.api_getMyArticle()
		},
		methods: {
			refshData() {
				uni.startPullDownRefresh()
			},
			api_getMyArticle() {
				if (!this.isLogin) {
					uni.stopPullDownRefresh();
					return
				}
				this.moreStatus = 'loading'
				this.$request('get-my-article', {
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
						}
					}

				}).catch(err => {
					console.error(err);
				})
			},
			create() {
				uni.navigateTo({
					url: '/pages/createArticle/createArticle'
				})
			},
			gotoLogin() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd'
				})
			}
		},
		onTabItemTap(e) {
			this.$store.dispatch('tabbar/changeTabbarIcon', e)
		},
	}
</script>

<style scoped lang="scss">
	.article-card-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;

		.article-card-add {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 300rpx;
			position: relative;
			overflow: hidden;
			border-radius: 10rpx;
			margin: 10rpx 20rpx;

			&::before {
				content: "";
				position: absolute;
				top: -100%;
				left: -100%;
				bottom: -100%;
				right: -100%;
				background: linear-gradient(45deg, #ffc700 0%, #e91e1e 50%, #6f27b0 100%);
				background-size: 100% 100%;
				animation: bgposition 8s infinite linear alternate;
				z-index: 0;
			}

			.top-tip {
				color: #eeeeee;
				position: absolute;
				top: 20rpx;
				left: 20rpx;
				font-size: 32rpx;
			}
		}
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

	@keyframes bgposition {
		0% {
			transform: translate(30%, 30%);
		}

		25% {
			transform: translate(30%, -30%);
		}

		50% {
			transform: translate(-30%, -30%);
		}

		75% {
			transform: translate(-30%, 30%);
		}

		100% {
			transform: translate(30%, 30%);
		}
	}
</style>
