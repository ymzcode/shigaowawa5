<template>
	<canvas id="no-data" class="no-data" type="2d"></canvas>
</template>

<script>
	import lottie from 'lottie-miniprogram'
	let nodataView = null
	export default {
		name: "lottie-like-no-data",
		data() {
			return {

			};
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
				uni.createSelectorQuery().in(this).selectAll('#no-data').node(res => {
					const width = 300
					const height = 200
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
						// animationData: require('@/static/json/125880-shape-animation.json'),
						// path: 'https://assets1.lottiefiles.com/packages/lf20_skMCZaRDnL.json',
						animationData: require('@/static/json/lottie-like-no-data.js'),
						// path: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cd668ee7-8151-4ac6-aeeb-ab0fc9b91400/2cf1c5ee-341b-4bda-9034-cca6bb02f3f2.json',
						rendererSettings: {
							context
						}
					})
				}).exec()
			},
			desNoData() {
				nodataView.destroy()
			}
		}
	}
</script>

<style scoped lang="scss">
	.no-data {
		width: 300px;
		height: 200px;
	}
</style>
