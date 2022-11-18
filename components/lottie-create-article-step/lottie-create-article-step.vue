<template>
	<canvas id="lottie-create-article-step" class="lottie-create-article-step" type="2d"></canvas>
</template>

<script>
	import lottie from 'lottie-miniprogram'
	let nodataView = null
	export default {
		name: "lottie-create-article-step",
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
			onClick() {
				console.log(123123);
			},
			initNoData() {
				uni.createSelectorQuery().in(this).selectAll('#lottie-create-article-step').node(res => {
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
						loop: true,
						autoplay: true,
						animationData: require('@/static/json/lottie-article-step.js'),
						// path: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cd668ee7-8151-4ac6-aeeb-ab0fc9b91400/c83ed195-d1f3-4ff2-ba85-22c95aec241b.json',
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
	.lottie-create-article-step {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100vw;
		height: 30vh;
		z-index: -1;
	}
</style>
