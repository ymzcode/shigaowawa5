<script>
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js'
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			await uniIdPageInit()
			
			
			// 如果存在token检查token
			if (uni.getStorageSync('uni_id_token')) {
				const IdCommonToken = uniCloud.importObject('id-common-token')
				IdCommonToken.checkToken(uni.getStorageSync('uni_id_token')).then(res => {
					console.log(res)
				})
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>
