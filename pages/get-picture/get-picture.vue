<template>
	<view>
		<u-alert title="上传图片识别文字" fontSize="18" center="TRUE" type = "warning" effect="dark" ></u-alert>
		<view class="text-wrap up-img">
			<u-row justify="space-between">
				<u-col span="4" offset="4">
					<u-upload uploadText="点击上传图片" :fileList="fileListOne" @afterRead="afterRead()" @delete="deletePic()"
					 name="1" multiple="false" :maxCount="1"></u-upload>
				</u-col>
			</u-row>
		</view>
		<view class="text-wrap" v-show="imageText != ''">
			<view class="content">
				<u--textarea v-model="imageText" maxlength="400" count autoHeight></u--textarea>
				<!-- <u--text type="info" :text="imageText"></u--text> -->
			</view>
		</view>
		<view class="save-img" v-show="imageText != ''">
			<u-row justify="space-between">
				<u-col span="5">
					<u-button type="error" text="重置图片文字" @click="deletePic()"></u-button>
				</u-col>
				<u-col span="2"></u-col>
				<u-col span="5">
					<u-button type="primary" text="一键复制文本" @click="copyText()"></u-button>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import ENV_DATA from '@/util/util.js'
	export default {
		data() {
			return {
				description: '文案获取成功',
				text: '粘贴文案',
				params: {
					input_url: ''
				},
				imageText: '',
				fileListOne: []
			};
		},
		methods: {
			// 新增图片
			async afterRead(event) {
				const result = await wx.cloud.callContainer({
					config: {
						env: this.ENV_DATA.env,
					},
					path: '/api/wechat/mini/user/check-rights',
					method: 'GET',
					header: {
						'X-WX-SERVICE': this.ENV_DATA.service,
						'X-WX-OPENID': 'oLmqy5Di2l0DTrZNyEqXqvE9mnB8',
					}
				})
				console.log(result);
				if (result.statusCode == 200) {
					if (result.data.code == 2001) {
						console.log(result.data.data.has_rights == 1)
						if(result.data.data.has_rights == 1){
							this.fileListOne[0] = {url: event.file[0].thumb};
							const result = await this.uploadFilePromise(event.file[0].url);
							console.log(JSON.parse(result.data));
							console.log(this.fileListOne);
							let _data = JSON.parse(result.data);
							this.imageText = Object.values(_data.data).join('\n');
						}else {
						uni.showToast({
							title: '您暂无此权限！',
							icon: 'fail',
							duration: 2000
						});
					}
					} 
				}
			},
			deletePic(e){
				console.log(e);
				this.fileListOne = [];
				this.imageText = '';
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: ENV_DATA.baseUrl+'/api/wechat/mini/tools/parse-pic', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'video_url',
						success: (res) => {
							setTimeout(() => {
								resolve(res)
							}, 1000)
						}
					});
				})
			},
			copyText(){
				uni.setClipboardData({
					data: this.imageText,
					success:function(){
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						})
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
		.content {
			padding: 10px 10px;
			font-size: 12px;
			border-radius: 7px;
			background: #fff;
		}

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
	.up-img {
		margin-top: 20px;
	}
	.save-img {
		text-align: center;
		width: 94%;
		margin: 15px auto;
		padding-bottom: 3rem;
	}
</style>
