<template>
	<view>
		<view class="my-title">
			<u-row customStyle="margin-bottom: 10px">
				<u-col span="3">
					<u-avatar class="user-img" :src="src"></u-avatar>
				</u-col>
				<u-col span="9" class="user-info">
					<view class="user-name">微信用户</view>
					<view class="user-id">个人ID：{{userId}}</view>
				</u-col>
			</u-row>
		</view>
		<view class="user-list">
			<u-cell-group>
				<u-cell icon="setting-fill" title="用户ID" :value="userId"></u-cell>
				<u-cell icon="integral-fill" title="会员等级" value="新版本"></u-cell>
				<u-cell icon="level" title="版本号" value="1.2.1"></u-cell>
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
				userId: 123456,
				currentNum: 1,
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
			};
		},
		methods: {
			changeTab() {},
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
		padding: 0px;

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
