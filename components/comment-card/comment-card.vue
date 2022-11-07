<template>
	<view class="comment-card">
		<view class="avatar">
			<u-avatar :src="userInfo.avatar_file.url" size="30"></u-avatar>
		</view>
		<view class="main">
			<view class="content">
				<text>{{ commentData.comment_content }}</text>
				<u-icon name="heart-fill" color="#ffffff" size="18"></u-icon>
			</view>
			<view class="btn-group">
				<view class="reply">
					<u-icon name="more-circle" color="#ffffff" size="16"></u-icon>
					<text>回复</text>
				</view>
				<view class="time">
					<u-icon name="clock" color="#eeeeee" size="12"></u-icon>
					<text>{{ commentTime }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment-card",
		props: {
			commentData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		},
		computed: {
			commentTime() {
				return uni.$u.timeFrom(this.commentData.comment_date)
			},
			userInfo() {
				return this.commentData.user_id[0]
			}
		}
	}
</script>

<style scoped lang="scss">
	.comment-card {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		margin: 20rpx 0;

		.avatar {
			padding-right: 30rpx;
		}

		.main {
			width: 100%;
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;

			.content {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				text {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					word-break: break-all;
					font-size: 34rpx;
					max-width: 400rpx;
				}
			}
			.btn-group {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				margin-top: 10rpx;
				.reply {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
					text {
						margin-left: 10rpx;
						font-size: 30rpx;
					}
				}
				.time {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-start;
					font-size: 26rpx;
					color: #eeeeee;
					text {
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>
