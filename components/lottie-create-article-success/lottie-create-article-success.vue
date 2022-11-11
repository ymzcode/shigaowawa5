<template>
	<view class="lottie-create-article-success">
		<canvas id="lottie-create-article-success" class="success-canvas" type="2d"></canvas>
	</view>
</template>

<script>
	import lottie from 'lottie-miniprogram'
	let nodataView = null
	export default {
		name: "lottie-create-article-success",
		data() {
			return {

			};
		},
		props: {
			path: null
		},
		mounted() {
			this.$nextTick(() => {
				this.initNoData()
			})
		},
		beforeDestroy() {
			this.desNoData()
		},
		methods: {
			initNoData() {
				uni.createSelectorQuery().in(this).selectAll('#lottie-create-article-success').node(res => {
					const width = uni.getSystemInfoSync().windowWidth
					const height = uni.getSystemInfoSync().windowHeight * 0.3
					const canvas = res[0].node
					const context = canvas.getContext('2d')
					const dpr = uni.getSystemInfoSync().pixelRatio
					canvas.width = width * dpr
					canvas.height = height * dpr
					context.scale(dpr, dpr)

					lottie.setup(canvas)
					nodataView = lottie.loadAnimation({
						loop: false,
						autoplay: true,
						path: 'https://assets8.lottiefiles.com/packages/lf20_lIfLg9.json',
						rendererSettings: {
							context
						}
					})
					// nodataView.setSpeed(0.5)
				}).exec()
			},
			desNoData() {
				nodataView.destroy()
			}
		}
	}
</script>

<style scoped lang="scss">
	.lottie-create-article-success {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100vw;
		.success-canvas {
			width: 100vw;
			height: 30vh;
		}
	}
</style>
