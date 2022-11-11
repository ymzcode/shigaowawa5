<template>
	<canvas id="lottie-article-like-success" class="lottie-article-like-success" type="2d"></canvas>
</template>


<script>
	import lottie from 'lottie-miniprogram'
	let nodataView = null
	export default {
		name: "lottie-article-like-success",
		data() {
			return {
			};
		},
		computed: {
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
				uni.createSelectorQuery().in(this).selectAll('#lottie-article-like-success').node(res => {
					const width = uni.getSystemInfoSync().windowWidth
					const height = uni.getSystemInfoSync().windowHeight
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
						path: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cd668ee7-8151-4ac6-aeeb-ab0fc9b91400/7161eb59-33fa-44ee-9ba6-a53d8685c400.json',
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
	.lottie-article-like-success {
		position: fixed;
		z-index: 8;
		top: 0;
		width: 100vw;
		height: 100vh;
	}
</style>
