<template>
	<view>
		<view class="title">提取文案</view>
		<view class="text-wrap">
			<u--textarea v-model="params.input_url" placeholder="请输入抖音分享链接" confirmType="done" @blur="blurFn()"
				@input="blurFn()"></u--textarea>

		</view>
		<view class="text-wrap">
			<u-row class="btn-group" justify="space-between" gutter="10">
				<u-col span="6">
					<u-button type="primary" :plain="true" :text="text" @click="doFn()"></u-button>
				</u-col>
				<u-col span="6">
					<u-button type="primary" text="获取文案" @click="parseVideo()"></u-button>
				</u-col>
			</u-row>
		</view>
		<view class="text-wrap" v-show="videoText != ''">
			<u-row>
				<u-col class="video-text" span="12" customStyle="margin-bottom: 10px">
					<view class="video-alert">
						<u-alert style="width: 160px;" type="success" :show-icon="true" :description="description"></u-alert>
					</view>
					<view class="save-picture">
						<u-button type="primary" text="复制文案" @click="saveText()"></u-button>
					</view>
				</u-col>
			</u-row>
			<u-row class="video-wrap">
				<u-col class="video-box" span="12">
					<u--textarea v-model="videoText"></u--textarea>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				description: '文案获取成功',
				text: '粘贴文案',
				params: {
					input_url: ''
				},
				videoText:''
			};
		},
		methods: {
			doFn() {
				let that = this
				if (that.text == '粘贴文案') {
					uni.getClipboardData({
						success: function(res) {
							console.log(res.data);
							that.params.input_url = res.data;
							that.text = '清空内容'
						},
						fail: function(res) {
							console.log(11111)
						},
					});
				} else {
					that.params.input_url = '';
					that.text = '粘贴文案';
				}
			},
			blurFn() {
				if (this.params.input_url != '') {
					this.text = '清空内容'
				}
			},
			async parseVideo() {
				uni.showLoading({
					title: '加载中'
				});
				const result = await wx.cloud.callContainer({
					config: {
						env: 'prod-1gon0lll2312bfb2',
					},
					path: '/api/wechat/mini/tools/parse-video',
					method: 'POST',
					data: this.params,
					header: {
						'X-WX-SERVICE': 'laravel-06z8',
						'X-WX-OPENID': 'oLmqy5Di2l0DTrZNyEqXqvE9mnB8',
					}
				});
				if(result.statusCode == 200){
					if (result.data.code == 2001) {
						this.videoText = result.data.data.title;
						uni.hideLoading();
					} else {
						uni.showToast({
							title: '您暂无此权限！',
							icon: 'fail',
							duration: 2000
						});
						uni.hideLoading();
					}
					
				}
			},
			saveText () {
				let that = this
				uni.setClipboardData({
					data: that.videoText,
					success: function() {
						uni.showToast({
							title: '内容已复制',
							duration: 2000,
							icon: 'success'
						});
						// uni.hideToast();
					},
					fail: function(err) {
						uni.showToast({
							title: '复制失败',
							duration: 2000,
							icon: 'fail'
						});
					}
				})
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
				width: 100%;
				height: 100%;
				object-fit: fill;
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

	}
</style>
