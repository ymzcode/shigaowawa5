<template>
	<view class="app-body-wrapper">

		<view v-if="nodata || !isLogin" class="no-data">
			<canvas id="no-data" type="2d"></canvas>
			<text>{{ !isLogin ? '登录后，再添加一个喜欢的作品吧' : '还没有喜欢的作品哦' }}</text>
			<u-button :customStyle="{
				width: '200rpx',
				marginTop: '20rpx'
			}" class="login-btn" v-if="!isLogin" text="登录" @click="gotoLogin"></u-button>
		</view>
		
		<view v-else class="my-favorite">
			
		</view>

	</view>
</template>

<script>
	import lottie from 'lottie-miniprogram'
	export default {
		data() {
			return {
				nodata: true
			}
		},
		computed: {
			isLogin() {
				return uniCloud.getCurrentUserInfo().uid
			}
		},
		onTabItemTap(e) {
			this.$store.dispatch('tabbar/changeTabbarIcon', e)
		},
		onLoad() {
			this.initNoData()
		},
		methods: {
			gotoLogin() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/login/login-withoutpwd'
				})
			},
			initNoData() {
				uni.createSelectorQuery().selectAll('#no-data').node(res => {
					const width = 300
					const height = 200
					const canvas = res[0].node
					const context = canvas.getContext('2d')
					const dpr = uni.getSystemInfoSync().pixelRatio
					canvas.width = width * dpr
					canvas.height = height * dpr
					context.scale(dpr, dpr)
					
					lottie.setup(canvas)
					lottie.loadAnimation({
						loop: true,
						autoplay: true,
						// animationData: require('@/static/json/125880-shape-animation.json'),
						// path: 'https://assets1.lottiefiles.com/packages/lf20_skMCZaRDnL.json',
						path: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cd668ee7-8151-4ac6-aeeb-ab0fc9b91400/2cf1c5ee-341b-4bda-9034-cca6bb02f3f2.json',
						rendererSettings: {
							context
						}
					})
				}).exec()
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
		
		#no-data {
			width: 300px;
			height: 200px;
		}

		text {
			color: #fff;
		}
	}
</style>
