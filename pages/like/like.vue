<template>
	<view class="app-body-wrapper">

		<view class="no-data">
			<canvas id="no-data" type="2d"></canvas>
			<text>还没有喜欢的作品</text>
		</view>

	</view>
</template>

<script>
	import lottie from 'lottie-miniprogram'
	export default {
		data() {
			return {
				albumArr: [],
			}
		},
		onTabItemTap(e) {
			this.$store.dispatch('tabbar/changeTabbarIcon', e)
		},
		onLoad() {
			this.initNoData()
		},
		methods: {
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
