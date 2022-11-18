<template>
	<!-- <canvas id="lottie-article-details-error" class="lottie-article-details-error" type="2d"></canvas> -->
	<image class="lottie-article-details-error" src="https://pic.imgdb.cn/item/637724d016f2c2beb170ddfd.gif" mode="aspectFit"></image>
</template>


<script>
	import lottie from 'lottie-miniprogram'
	let nodataView = null
	export default {
		name: "lottie-article-details-error",
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
				uni.createSelectorQuery().in(this).selectAll('#lottie-article-details-error').node(res => {
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
						path: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cd668ee7-8151-4ac6-aeeb-ab0fc9b91400/49bde3f1-6418-48a1-8ee8-b7b4fa5e65db.json',
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
	.lottie-article-details-error {
		width: 300px;
		height: 200px;
	}
</style>
