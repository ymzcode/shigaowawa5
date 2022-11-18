<template>
	<!-- <canvas class="no-data" id="lottie-my-article-no-data" type="2d"></canvas> -->
	<image class="no-data" src="https://pic.imgdb.cn/item/63771ff016f2c2beb163cddc.gif" mode="aspectFit"></image>
</template>

<script>
	import lottie from 'lottie-miniprogram'
	let nodataView = null
	export default {
		name: "lottie-my-article-no-data",
		data() {
			return {

			};
		},
		mounted() {
			// this.$nextTick(() => {
			// 	this.initNoData()
			// })
		},
		beforeDestroy() {
			// this.desNoData()
		},
		methods: {
			initNoData() {
				uni.createSelectorQuery().in(this).selectAll('#lottie-my-article-no-data').node(res => {
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
						animationData: require('@/static/json/lottie-my-article-no-data.js'),
						// path: 'https://assets8.lottiefiles.com/packages/lf20_PWEiASV6Bw.json',
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
