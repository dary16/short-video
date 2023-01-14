<template>
	<view>
		<view class="title">提取原视频</view>
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
					<u-button type="primary" text="一键提取" @click="parseVideo()"></u-button>
				</u-col>
			</u-row>
		</view>
		<view class="text-wrap" v-show="videoSrc != ''">
			<u-row class="video-wrap" justify="center" customStyle="margin-bottom: 10px">
				<u-col class="video-box" span="12" textAlign="center">
					<video class="video" id="demoVideo" controls="controls"
						:src="videoSrc">
					</video>
				</u-col>
			</u-row>
			<u-row>
				<u-col class="video-text" span="12">
					<view class="video-alert">
						<u-alert style="width: 160px;" type="success" :show-icon="true" :description="description">
						</u-alert>
					</view>
					<view class="save-picture">
						<u-button type="primary" text="保存原视频到相册" @click="saveVideo"></u-button>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				description: '已为您提取原视频',
				text: '粘贴链接',
				params: {
					input_url: ''
				},
				videoSrc: ''
			};
		},
		methods: {
			doFn() {
				let that = this
				if (that.text == '粘贴链接') {
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
					that.text = '粘贴链接';
				}
			},
			blurFn() {
				if (this.params.input_url != '') {
					this.text = '清空内容'
				}
			},
			async parseVideo() {
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
						this.videoSrc = result.data.data.url;
						console.log(this.videoSrc);
					} else {
						uni.showToast({
							title: '您暂无此权限！',
							icon: 'fail',
							duration: 2000
						});
					}
					
				}
			},
			saveVideo() {
				let that = this
				const downloadUrl = uni.downloadFile({
					url: that.videoSrc,
					success(res) {
						if (res.statusCode === 200) {
							/* uni.showToast({
								title: '视频连接正确',
								icon: "none"
							});
							console.log(res); */
							uni.saveVideoToPhotosAlbum({
								filePath: res.tempFilePath,
								success() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function(e) {
									console.log(e);
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						}
					}
				});
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
			position: relative;
			padding: 10px;
			.video-box{
				position: absolute;
				left: 0;
				right: 0;
				width: 100vw;
				marin: 0 auto;
				.video {
					width: 100%;
					height: 100%;
					object-fit: fill;
				}
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
