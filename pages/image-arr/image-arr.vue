<template>
	<view class="fixed-wrap">
		<view class="info-text">
			文案库仅为参考学习使用，勿作他用！
		</view>
		<view class="img-list">
			<u-swiper :list="list" :current="current" :autoplay="false" radius="8" height="450px" indicator indicatorMode="line" circular @change="e => current = e.current"></u-swiper>
		</view>
		<view class="time">发布于 {{dataList.updated_at}}</view>
		<view class="save-img">
			<u-button type="primary" text="保存图片到系统相册" @click="saveImg()"></u-button>
		</view>
		<view class="grid-box">
			<u-grid :border="false" col="3">
				<u-grid-item>
					<u-icon color="#fff" :customStyle="{paddingTop:20+'rpx'}" name="heart" :size="22"></u-icon>
					<text class="grid-text">{{dataList.vritual_viewed}}</text>
				</u-grid-item>
				<u-grid-item>
					<u-icon color="#fff" :customStyle="{paddingTop:20+'rpx'}" name="download" :size="22"></u-icon>
					<text class="grid-text">{{dataList.vritual_used}}</text>
				</u-grid-item>
				<u-grid-item>
					<u-icon color="#fff" :customStyle="{paddingTop:20+'rpx'}" name="share-square" :size="22"></u-icon>
					<text class="grid-text">{{dataList.vritual_forwarded}}</text>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				dataList: {},
				iconList: [{
						name: 'heart',
						title: '浏览'
					},
					{
						name: 'download',
						title: '下载'
					},
					{
						name: 'share-square',
						title: '转发'
					},
				],
				current: 0
			};
		},
		onLoad(v) {
			let data = v;
			this.dataList = JSON.parse(data.dataInfo);

			this.list = this.dataList.images;
		},
		methods: {
			saveImg() {
				let _url = '';
				this.list.forEach((item,i)=>{					if(i == this.current){						_url = item;					}				});
				//获取用户的当前设置。获取相册权限
				uni.getSetting({
					success: (res) => {
						//如果没有相册权限
						if (!res.authSetting["scope.writePhotosAlbum"]) {
							//向用户发起授权请求
							uni.authorize({
								scope: "scope.writePhotosAlbum",
								success: () => {
									uni.downloadFile({
										url: _url,
										success(res) {
											if (res.statusCode === 200) {
												//授权成功保存图片到系统相册
												uni.saveImageToPhotosAlbum({
													//图片路径，不支持网络图片路径
													filePath: _url,
													success: (res) => {
														return uni.showToast({
															title: "保存成功！",
															duration: 2000
														});
													},
													fail: (res) => {
														console.log(res
														.errMsg);
														return uni.showToast({
															title: res
																.errMsg,
														});
													},
													complete: (res) => {
													},
												});
											} else {
												console.log("download file failed!");
											}
										},
										fail(res) {
											uni.showToast({
												title: "保存失败!",
												icon: "fail",
												duration: 2000
											});
										}
									});
								},
								//授权失败
								fail: () => {
									uni.hideLoading();
									uni.showModal({
										title: "您已拒绝获取相册权限",
										content: "是否进入权限管理，调整授权？",
										success: (res) => {
											if (res.confirm) {
												//调起客户端小程序设置界面，返回用户设置的操作结果。（重新让用户授权）
												uni.openSetting({
													success: (res) => {
														console.log(res
															.authSetting
															);
													},
												});
											} else if (res.cancel) {
												return uni.showToast({
													title: "已取消！",
													duration: 2000
												});
											}
										},
									});
								},
							});
						} else {
							//如果已有相册权限，直接保存图片到系统相册
							uni.downloadFile({
								url: _url,
								success(res) {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: (res) => {
												uni.hideLoading();
												return uni.showToast({
													title: "保存成功！",
													duration: 2000
												});
											},
											fail: (res) => {
												uni.hideLoading();
												console.log(res.errMsg);
												return uni.showToast({
													title: res.errMsg,
												});
											},
											//无论成功失败都走的回调
											complete: (res) => {
												uni.hideLoading();
											},
										});
									} else {
										console.log("download file failed!");
									}
								},
								fail(res) {
									uni.showToast({
										title: "非法业务!",
										icon: "fail"
									});
								}
							});
						}
					},
					fail: (res) => {
					},
				});

			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-text {
		text-align: center;
		font-size: 12px;
		color: #acacac;
		padding: 20px 30px 30px 30px;
	}

	.img-list {
		width: 60%;
		margin: 0 auto;
	}

	.save-img {
		text-align: center;
		position: fixed;
		left: 20%;
		right: 20%;
		bottom: 4%;
	}

	.fixed-wrap {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000;

		.time {
			font-size: 12px;
			color: #d0d0d0;
			text-align: center;
			padding: 30px 30px 20px 30px;
		}

		.grid-box {
			width: 80%;
			margin: 0 auto;
			color: #d0d0d0;
			font-size: 12px;
		}
	}
</style>
