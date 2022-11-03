<template>
	<view class="app-body-wrapper" :scroll-y="true">
		我的作品
		<u-button type="primary" text="创建新作品" @click="create"></u-button>
	</view>
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

</style>
