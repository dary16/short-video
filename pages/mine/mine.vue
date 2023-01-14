<template>
	<view>
		<view class="my-title">
			<u-row class="user-wrap" customStyle="margin-bottom: 10px">
				<u-col span="3" offset="1">
					<u-avatar class="user-img" :src="src"></u-avatar>
					<!-- <u--image :showLoading="true" :src="src" width="40px" height="40px"></u--image> -->
				</u-col>
				<u-col span="8" class="user-info">
					<view class="user-name">微信用户</view>
					<view class="user-id">个人ID：{{userId}}
					<u-button class="copy-btn" style="width: 60px!important;" type="success" text="复制" size="small"shape="circle" @click="copyFn"></u-button>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="user-list">
			<u-cell-group>
				<u-cell icon="setting-fill" :iconStyle="iconStyle1" title="用户ID" :value="userId"></u-cell>
				<u-cell icon="integral-fill" :iconStyle="iconStyle2" title="绑定授权" value=""></u-cell>
				<u-cell icon="level" :iconStyle="iconStyle3" title="版本号" value="1.2.1"></u-cell>
			</u-cell-group>
		</view>
		<u-tabbar :value="currentNum" @change="changeTab" :fixed="true" :border="false" :placeholder="false"
			:safeAreaInsetBottom="false">
			<u-tabbar-item text="首页" icon="home" @click="homeFn"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				currentNum: 1,
				src: '../static/user.png',
				iconStyle1:{
					color: "#b6a7ff"
				},
				iconStyle2:{
					color: "#ffdeb4"
				},
				iconStyle3:{
					color: "#62aeff"
				}
			};
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			changeTab() {},
			copyFn(){
				let that = this;
				uni.setClipboardData({
					data: that.userId,
					success: () => {
						uni.showToast({
							title: '复制成功',
							icon: 'success'
						})
					}
				})
			},
			async getUserInfo(){
				const result = await wx.cloud.callContainer({
					config: {
						env: 'prod-1gon0lll2312bfb2',
					},
					path: '/api/wechat/mini/user/check-rights',
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'laravel-06z8',
						'X-WX-OPENID': 'oLmqy5Di2l0DTrZNyEqXqvE9mnB8',
					}
				})
				console.log(result);
				if (result.statusCode == 200) {
					if (result.data.code == 2001) {
						this.userId = result.data.data.user_id;
						console.log(this.userId);
					} else {
						uni.showToast({
							title: '您暂无此权限！',
							icon: 'fail',
							duration: 2000
						});
					}
				}
			},
			homeFn() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-title {
		padding: 10px 20px;
		background-color: #fff;
		margin-bottom: 20px;

		.user-img {
			display: block;
			margin: 0 auto;
		}

		.user-info {
			padding: 20px 10px;
			.user-name {
				font-weight: bold;
				font-size: 14px;
			}

			.user-id {
				font-size: 12px;
				display: inline-block;
				padding: 5px 0;
				width: 100px;
				position: relative;
				margin-bottom: 10px;
				.copy-btn{
					position: absolute;
					left: 100px;
					top: 0;
					right: 30%;
				}
			}
		}
	}

	.user-list {
		width: 94%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 8px;
	}
</style>
