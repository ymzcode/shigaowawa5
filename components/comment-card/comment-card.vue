<template>
	<view class="comment-card-wrapper">
		<view class="comment-card">
			<view class="avatar">
				<u-avatar :src="userInfo.avatar_file.url" size="30"></u-avatar>
				<!-- <text>{{ userInfo.nickname }}</text> -->
			</view>
			<view class="main">
				<view class="content">
					<text>{{ commentData.comment_content }}</text>
					<u-icon name="thumb-up-fill" color="#ffffff" size="18"></u-icon>
				</view>
				<view class="btn-group">
					<view class="reply">
						<u-icon name="account" color="#ffffff" size="12"></u-icon>
						<text>{{userInfo.nickname}}</text>
					</view>
					<view class="time">
						<u-icon name="clock" color="#eeeeee" size="12"></u-icon>
						<text>{{ commentTime }}</text>
					</view>
				</view>
			</view>
		</view>


		<!-- <view class="reply-comment">
			<u-icon name="chat" color="#eeeeee" size="16"></u-icon>
			<text>查看回复</text>
			<u-line></u-line>
		</view> -->
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
			},
			reply() {
				return this.$store.getters['comment/reply']
			}
		},
		methods: {
			replyComment() {
				this.$store.dispatch('comment/setReplyData', this.commentData)
			}
		}
	}
</script>

<style scoped lang="scss">
	.comment-card-wrapper {
		display: flex;
		flex-direction: column;
	}

	.reply-comment {
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		margin-left: 100rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;

		text {
			min-width: 140rpx;
			font-size: 28rpx;
			margin-left: 10rpx;
			margin-right: 10rpx;
		}
	}

	.comment-card {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		margin: 20rpx 0;

		.avatar {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-right: 30rpx;
			text {
				word-break: break-all;
				max-width: 60rpx;
				margin-top: 10rpx;
				font-size: 28rpx;
			}
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
						font-size: 26rpx;
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
