<template>
	<canvas id="lottie-home-hello" class="lottie-home-hello" type="2d"></canvas>
</template>

<script>
	import lottie from 'lottie-miniprogram'
	let nodataView = null
	export default {
		name: "lottie-home-hello",
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
				uni.createSelectorQuery().in(this).selectAll('#lottie-home-hello').node(res => {
					const width = 120
					const height = 120
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
						animationData: require('@/static/json/lottie-hello.js'),
						// path: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cd668ee7-8151-4ac6-aeeb-ab0fc9b91400/16faff44-c18b-4ce6-88ed-545a1eb4166d.json',
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
	.lottie-home-hello {
		position: absolute;
		width: 120px;
		height: 120px;
		top: -40px;
		left: -25px;
	}
</style>
