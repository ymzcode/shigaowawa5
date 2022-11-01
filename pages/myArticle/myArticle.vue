<template>
	<scroll-view class="body-wrapper" :scroll-y="true">
		我的作品
		<u-button type="primary" text="创建新作品" @click="create"></u-button>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			create() {
				uni.navigateTo({
					url: '/pages/createArticle/createArticle'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.body-wrapper {
		background: $linear-theme-bg;
		color: #ffffff;
		height: 100vh;
	}
</style>
