<template>
	<view class="container">
		<view>
			<u-swiper :list="list1" @change="change" @click="click"></u-swiper>
		</view>
		<view class="grid-list">
			<u-grid :border="false" col="4">
				<u-grid-item style="padding-top: 10px;" @click="gridFn(0)">
					<view class="icon iconfont icon-shipin iconlist0"></view>
					<text class="grid-text">视频提取</text>
				</u-grid-item>
				<u-grid-item style="padding-top: 10px;" @click="gridFn(1)">
					<view class="icon iconfont icon-baobiaomoban iconlist1"></view>
					<text class="grid-text">获取文案</text>
				</u-grid-item>
				<u-grid-item style="padding-top: 10px;" @click="gridFn(2)">
					<view class="icon iconfont icon-note iconlist2"></view>
					<text class="grid-text">模板素材</text>
				</u-grid-item>
				<u-grid-item style="padding-top: 10px;" @click="gridFn(3)">
					<view class="icon iconfont icon-weijincijiance iconlist3"></view>
					<text class="grid-text">违禁词检测</text>
				</u-grid-item>
				<u-grid-item @click="gridFn(4)">
					<view class="icon iconfont icon-tuwen iconlist4"></view>
					<text class="grid-text">图文提取</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="goods-list">
			<view class="goods-title">商品列表</view>
			<!-- <u-empty mode="list" text="商品待添加,请耐心等候!"> -->
			</u-empty>
			<view v-if="loading"></view>
			<template>
				<view class="good-wrap" v-if="goodsList.length > 0" v-for="(item,index) in goodsList" :key="index"
					@click="goodInfo(item)">
					<u-row class="good-box">
						<u-col span="4">
							<div class="flex-content">
								<u-image :src="item.images[0]" radius="6" width="90px" height="90px" :lazy-load="true"></u-image>
							</div>
						</u-col>
						<u-col span="8">
							<div class="good-desc">{{item.name}}</div>
							<div class="good-info">
								<view class="good-price">价格：¥{{item.original_price}}</view>
								<view class="good-tag">
									高佣 {{item.discount}}%
									<!-- <u-badge :type="type" max="99" :value="item.discount"></u-badge> -->
									<!-- <u-tag bgColor="#f5cfad" size="mini" color="#f00" shape="circle" borderColor="#f5cfad" :text="item.discount"></u-tag> -->
								</view>
							</div>
						</u-col>
					</u-row>
				</view>
				<view v-else>
					<u-empty mode="list" text="暂无数据">
					</u-empty>
				</view>
			</template>
			<uni-load-more :contentText="contentText" :status="status"></uni-load-more>
		</view>
		<u-back-top :scroll-top="scrollTop" top="600"></u-back-top>
		<u-tabbar :value="currentNum" @change="changeTab" :fixed="true" :border="false" :placeholder="false"
			:safeAreaInsetBottom="false">
			<u-tabbar-item text="首页" icon="home" @click="click1"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="mineFn"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentNum: 0,
				status: 'more',
				loading: true,
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				list1: [
					'https://short-video-1259353699.cos.ap-guangzhou.myqcloud.com/web/b01.png',
					'https://short-video-1259353699.cos.ap-guangzhou.myqcloud.com/web/b02.png',
					'https://short-video-1259353699.cos.ap-guangzhou.myqcloud.com/web/b03.png',
				],
				list: [{
						class: 'icon-shipin',
						style: {
							'color': '#b98be5',
							'font-size': '35px',
							'height': '35px',
							'line-height': '40px'
						},
						title: '视频提取'
					},
					{
						class: 'icon-baobiaomoban',
						style: {
							'color': '#0acc8b',
							'font-size': '30px',
							'height': '35px',
							'line-height': '40px'
						},
						title: '获取文案'
					},
					{
						class: 'icon-note',
						style: {
							'color': '#ef9949',
							'font-size': '30px',
							'height': '35px',
							'line-height': '40px'
						},
						title: '模板素材'
					},
					{
						class: 'icon-weijincijiance',
						style: {
							'color': '#5996f2',
							'font-size': '30px',
							'height': '35px',
							'line-height': '40px'
						},
						title: '违禁词检测'
					},
				],
				goodsList: [],
				scrollTop: 0,
				params: {
					page: 1,
					page_size: 10
				},
				loadingText: '加载中...',
				loadingType: 0,
				contentText: {
					contentdown: '正在加载...',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				}
			}
		},
		onLoad() {
			this.getGoodsList();
		},
		onShow() {
			wx.hideHomeButton();
		},
		methods: {
			change() {},
			changeTab() {},
			click1() {},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			commonClass(i) {
				return "iconlist" + i
			},
			async getGoodsList() {
				if (this.loadingType !== 0) {
					return false
				}
				this.loadingType = 1;
				// 显示加载动画
				uni.showNavigationBarLoading();
				const result = await wx.cloud.callContainer({
					config: {
						env: 'prod-1gon0lll2312bfb2',
					},
					path: '/api/wechat/mini/contents/goods-list',
					method: 'GET',
					data: this.params,
					header: {
						'X-WX-SERVICE': 'laravel-06z8',
						'X-WX-OPENID': 'oLmqy5Di2l0DTrZNyEqXqvE9mnB8',
					}
				})
				if (result.statusCode == 200) {
					let resultData = result.data.data.list;
					if (resultData.length < 1) {
						this.loadingType = 2;
						this.status = 'noMore';
						uni.hideNavigationBarLoading();
						return;
					}
					if (resultData.length < 10) {
						console.log('最后一页了');
						this.status = 'noMore';
					}
					this.params.page++;
					console.log(resultData.length, 666);
					this.goodsList = this.goodsList.concat(resultData);
					this.loadingType = 0;
					uni.hideNavigationBarLoading();
				}
			},
			// 下拉刷新
			onPullDownRefresh() {
				console.log('下拉刷新');
			},
			// 上拉加载
			onReachBottom() {
				setTimeout(() => {
					this.getGoodsList();
				}, 1000)
			},
			gridFn(i) {
				if (i == 0) {
					uni.navigateTo({
						url: '/pages/get-video/get-video'
					})
				} else if (i == 1) {
					uni.navigateTo({
						url: '/pages/get-text/get-text'
					})
				} else if (i == 2) {
					uni.navigateTo({
						url: '/pages/get-module/get-module'
					})
				} else if (i == 3) {
					uni.navigateTo({
						url: '/pages/get-forbid/get-forbid'
					})
				} else if (i == 4) {
					uni.navigateTo({
						url: '/pages/get-picture/get-picture'
					})
				}
			},
			mineFn() {
				uni.redirectTo({
					url: '/pages/mine/mine'
				})
			},
			goodInfo(data) {
				let dataInfo = JSON.stringify(data);
				console.log(dataInfo);
				uni.navigateTo({
					url: '/pages/good-info/good-info?dataInfo=' + dataInfo
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-icon {
		font-size: 26px;
	}

	.iconlist0 {
		color: #b98be5;
		font-size: 35px;
		height: 35px;
		line-height: 40px;
	}

	.iconlist1 {
		color: #0acc8b;
		font-size: 32px;
		height: 35px;
		line-height: 40px;
	}

	.iconlist2 {
		color: #ef9949;
		font-size: 40px;
		height: 35px;
		line-height: 36px;
	}

	.iconlist3 {
		color: #5996f2;
		font-size: 36px;
		height: 36px;
		line-height: 40px;
	}
	.iconlist4 {
		color: #ff8980;
		font-size: 36px;
		height: 34px;
		line-height: 34px;
		margin-top: 10px;
	}	

	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;

		.grid-list {
			width: 98%;
			margin: 0 auto;
			display: inline-block;
			padding: 5px;
			margin-top: 20px;
			background-color: #fff;
			border-radius: 8px;
			padding-top: 10px;

			.grid-text {
				padding: 6px 4px;
				font-size: 12px;
			}
		}

		.goods-list {
			width: 100%;
			margin-top: 20px;
			// margin: 0 auto;
			margin-bottom: 50px;
			.good-wrap{
				background-color: #fff;
				border-radius: 8px;
				padding: 5px 10px;
				margin-bottom: 10px;
				width: 96%;
				margin: 0 auto;
				margin-top: 10px;
			}

			.goods-title {
				font-size: 16px;
				font-weight: bold;
				padding: 10px;
				text-align: left;
			}

			.good-box {
				width: 96%;
				margin: 0 auto;
			}

			.good-desc {
				font-size: 14px;
				text-align: left;
				padding: 5px 10px;
				font-size: 12px;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2; //可设置显示的行数
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.good-info {
				padding: 5px 10px;
				text-align: left;

				.good-price {
					color: #000000;
					font-size: 14px;
					display: inline-block;
					font-weight: 600;
				}

				.good-tag {
					float: right;
					background-color: #ffeee5;
					color: #ff406c;
					border-radius: 16px;
					padding: 4px 10px;
					font-size: 12px;
				}
			}
		}
	}
</style>
