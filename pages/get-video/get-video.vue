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
					<u-button type="primary" text="一键提取" @click="getVideo()"></u-button>
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
						<u-button type="primary" text="保存原视频到相册" @click="saveVideo(videoSrc)"></u-button>
					</view>
				</u-col>
			</u-row>
		</view>
		<u-modal :show="show" :title="title" confirmText="我知道了" cancelText="放弃" showCancelButton="true" @confirm="confirmFn" @cancel="cancelFn">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
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
				videoSrc: '',
				title: '说明',
				show: false,
				content: `去水映功能由指南针完全免费提供，不收取任何费用，不进行任何商业性目的使用。<br><br>
				指南针作为提供技术服务的中立工具，提供的去水映功能仅帮助用户提取视频自行学习、观看，降低视频浏览障碍，提升观赏体验。<br><br>
				请用户注意合法使用，若用户滥用该功能实施侵权行为，用户应自行承担由此产生的法律责任。指南针倡导与用户共同营造风清气正的网络环境!`
			};
		},
		methods: {
			doFn() {
				let that = this;
				if (that.text == '粘贴链接') {
					uni.getClipboardData({
						success: function(res) {
							console.log(res.data);
							that.params.input_url = res.data;
							that.videoSrc = '';
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
					this.text = '清空内容';
					this.videoSrc = '';
				}
			},
			confirmFn(){
				this.show = false;
				this.parseVideo();
			},
			cancelFn(){
				this.show = false;
				return false;
			},
			getVideo(){
				this.show = true;
			},
			async parseVideo() {
				if(this.videoSrc !== ''){
					uni.showToast({
						title: '请勿重复提取!',
						icon: 'fail',
						duration: 2000
					});
				}
				if(this.params.input_url == ''){
					uni.showToast({
						title: '请粘贴链接!',
						icon: 'fail',
						duration: 2000
					});
				}else{
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
								title: '您暂无此权限!',
								icon: 'fail',
								duration: 2000
							});
						}
						
					}
				}
			},
			saveVideo(_url) {
				uni.showLoading({
					title: '正在保存...'
				});
				let that = this;
				setTimeout(()=>{
					// 获取用户的当前设置。获取相册权限
					uni.getSetting({
						success: (res) => {
							// 如果没有相册权限
							if (!res.authSetting["scope.writePhotosAlbum"]) {
								// 向用户发起授权请求
								uni.authorize({
									scope: "scope.writePhotosAlbum",
									success: () => {
										uni.downloadFile({
											url: "https://laravel-06z8-26118-6-1316511786.sh.run.tcloudbase.com/api/wechat/mini/contents/video-steam?video_url=" + escape(_url),
											success(res) {
												if (res.statusCode === 200) {
													uni.saveVideoToPhotosAlbum({
														filePath: res.tempFilePath,
														success() {		
															 uni.showToast({title: "保存成功!"});
															setTimeout(function () {
															   uni.hideLoading();
															}, 10);
														},
														fail: function(e) {
															console.log(res);
															uni.showToast({title: "保存失败!", icon: "fail"});
															setTimeout(function () {
															   uni.hideLoading();
															}, 10);
														}
													});
												} else {
													console.log("download file failed!");
													uni.hideLoading();
												}
											},
											fail(res) {
												console.log(res);
												uni.showToast({title: "保存失败!", icon: "fail"});
												setTimeout(function () {
												   uni.hideLoading();
												}, 10);
											}
										});
									},
									// 授权失败
									fail: () => {
										uni.showModal({
											title: "您已拒绝获取相册权限",
											content: "是否进入权限管理，调整授权？",
											success: (res) => {
												if (res.confirm) {
													// 调起客户端小程序设置界面，返回用户设置的操作结果。（重新让用户授权）
													uni.openSetting({
														success: (res) => {
															console.log(res.authSetting);
														},
													});
												} else if (res.cancel) {
													return uni.showToast({
														title: "已取消!",
													});
												}
											},
										});
									},
								});
							} else {
								// 如果已有相册权限，直接保存图片到系统相册
								uni.downloadFile({
									
									url: "https://laravel-06z8-26118-6-1316511786.sh.run.tcloudbase.com/api/wechat/mini/contents/video-steam?video_url=" + escape(_url),
									success(res) {
										if (res.statusCode === 200) {
											uni.saveVideoToPhotosAlbum({
												filePath: res.tempFilePath,
												success() {														
													uni.showToast({title: "保存成功!"});
													setTimeout(function () {
													   uni.hideLoading();
													}, 1000);
												},
												fail: function(e) {
													console.log(res);
													uni.showToast({title: "保存失败!", icon: "fail"});
													setTimeout(function () {
													   uni.hideLoading();
													}, 1000);
												}
											});
										} else {
											console.log("download file failed!");
											uni.hideLoading();
										}
									},
									fail(res) {
										console.log(res);
										uni.showToast({title: "失败!", icon: "fail"});
										setTimeout(function () {
										   uni.hideLoading();
										}, 1000);
									}
								});
							}
						},
						fail: (res) => {
							console.log(res);
							uni.showToast({title: "授权失败!", icon: "fail"});
							setTimeout(function () {
							   uni.hideLoading();
							}, 1000);
						},
					});
				},1000)
			},
			
		},
		

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
