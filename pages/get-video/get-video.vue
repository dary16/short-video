<template>
	<view>
		<view class="title">提取原视频</view>
		<view class="text-wrap">
			<u--textarea v-model="value" placeholder="请输入内容" confirmType="done" @blur="blurFn"></u--textarea>
			
		</view>
		<view class="text-wrap">
			<u-row class="btn-group" justify="space-between" gutter="10">
				<u-col span="6">
					<u-button type="primary" :plain="true" :text="text" @click="doFn()"></u-button>
				</u-col>
				<u-col span="6">
					<u-button type="primary" text="一键提取"></u-button>
				</u-col>
			</u-row>
		</view>
		<view class="text-wrap">
			<u-row class="video-wrap" customStyle="margin-bottom: 10px">
				<u-col class="video-box" span="12">
					<video class="video" id="demoVideo" :controls="false"
						src="//i2.wp.com/img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v">
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
				value: '',
				description: '已为您提取原视频',
				text: '粘贴文案'
			};
		},
		methods: {
			doFn() {
				if (this.text == '粘贴文案') {
					uni.getClipboardData({
						success: function(res) {
							console.log(res.data);
							this.value = res.data;
							this.text = '清空内容'
						}
					});
				} else {
					this.value = '';
					this.text = '粘贴文案';
				}
			},
			blurFn() {
				if (this.value != '') {
					this.text = '清空内容'
				}
			},
			saveVideo() {
				const downloadUrl = uni.downloadFile({
					url: '',
					success(res) {
						if (res.statusCode === 200) {
							uni.showToast({
								title: '视频连接正确',
								icon: "none"
							});
							console.log(res);
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
			padding: 10px;

			.video {
				width: 320px;
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
