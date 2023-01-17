<template>
	<view>
		<view class="title">违禁词检测</view>
		<view class="text-wrap">
			<u--textarea v-model="wait_text" placeholder="请输入待检测内容" @blur="blurFn" confirmType="done"></u--textarea>
		</view>
		<view class="text-wrap">
			<u-row class="btn-group" justify="space-between" gutter="10">
				<u-col span="6">
					<u-button type="primary" :plain="true" :text="text" @click="doFn()"></u-button>
				</u-col>
				<u-col span="6">
					<u-button type="primary" text="立即检测" @click="checkText()"></u-button>
				</u-col>
			</u-row>
		</view>
		<view class="text-wrap" v-show="show">
			<view class="title">检测结果</view>
			<view class="forbid-result">
				<view class="title">包含违禁词</view>
				<u--text type="warning" :text="forbidText"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wait_text: '',
				description: '检测成功',
				text: '粘贴文本',
				show: false,
				forbidText: ''
			};
		},
		methods: {
			doFn() {
				let that = this;
				that.show = false;
				if (that.text == '粘贴文本') {
					uni.getClipboardData({
						success: function(res) {
							that.wait_text = res.data;
							that.text = '清空内容';
						},
						fail: function(res) {
							console.log(11111)
						},
					});
				} else {
					that.wait_text = '';
					that.text = '粘贴文本';
				}

			},
			async checkText() {
				uni.showLoading({
					title: '加载中'
				});

				const result = await wx.cloud.callContainer({
					config: {
						env: 'prod-1gon0lll2312bfb2',
					},
					path: '/api/wechat/mini/tools/check-content',
					method: 'POST',
					data: {
						content: this.wait_text
					},
					header: {
						'X-WX-SERVICE': 'laravel-06z8',
						'X-WX-OPENID': 'oLmqy5Di2l0DTrZNyEqXqvE9mnB8',
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 2001 && result.data.data.is_invalid) {
						this.show = true;
						this.forbidText = result.data.data.words.join('、');
						uni.hideLoading();
					} else {
						uni.showToast({
							title: result.data.msg,
							icon: 'fail',
							duration: 2000
						});
						uni.hideLoading();
					}

				}
			},
			blurFn() {
				if (this.wait_text != '') {
					this.text = '清空内容'
				}
				console.log('失去焦点');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 16px;
		font-weight: bold;
		padding: 10px;
		text-align: left;
	}

	.text-wrap {
		width: 96%;
		border-radius: 8px;
		margin: 0 auto;
		margin-bottom: 20px;

		.btn-group {
			margin-top: 20px;
			text-align: center;

			.left-btn {
				width: 150px;
				display: inline-block;
				margin-right: 20px;
			}

			.right-btn {
				width: 150px;
				display: inline-block;
			}
		}

		.video-wrap {
			padding: 10px;

			.video {
				width: 151px;
			}

			.video-text {
				width: 100%;
				margin: 0 auto;

				.video-alert {
					margin: 0 auto;
				}

				.save-picture {
					margin-top: 20px;

					button {
						width: 160px;
						margin: 0 auto;
					}
				}
			}
		}

		.forbid-result {
			width: 96%;
			border-radius: 8px;
			margin: 0 auto;
			background-color: #fff;
			padding: 10px 20px;

			.title {
				color: #ff007f;
			}
		}
	}
</style>
