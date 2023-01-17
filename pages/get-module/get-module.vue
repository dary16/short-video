<template>
	<view>
		<!-- <view class="mode-box">
			<u-empty
			        mode="list"
			        text="模板资源正在整理,请耐心等候!"
			>
			</u-empty>
		</view> -->
		<view class="type-box">
			<view class="type-item" :class="[activeIndex == index ? 'active' : '']" v-for="(item,index) in typelist"
				:key="item.id" @click="typeFn(item.id,index)">{{item.title}}</view>
		</view>
		<view class="search-box">
			<view class="container">
				<view class="half" v-if="list.length > 0" v-for="(item,index) in list" :key="index">
					<image mode="widthFix" :src="item.images[0]" @click="imageFn(item)"></image>
					<view class="text-box">
						<view class="left">
							浏览量 {{item.vritual_viewed}}
						</view>
						<view class="right">
							发布于 {{item.updated_at.slice(0,10)}}
						</view>
					</view>
				</view>
				<view v-else>
					<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/car.png">
					</u-empty>
				</view>
			</view>
		</view>
		<uni-load-more :contentText="contentText" :status="status"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				current: 0,
				list: [],
				imgList: [],
				params: {
					page: 1,
					page_size: 10,
					cate_id: 0
				},
				loadingText: '加载中...',
				loadingType: 0,
				contentText: {
					contentdown: '正在加载...',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				status: 'more',
				activeIndex: 0,
				typelist: [{
					id: 0,
					title: '全部'
				}]
			};
		},
		components: {},
		onLoad() {
			this.getTypeList();
			this.getImgList();
		},
		methods: {
			async getTypeList() {
				const result = await wx.cloud.callContainer({
					config: {
						env: 'prod-1gon0lll2312bfb2',
					},
					path: '/api/wechat/mini/contents/category-list',
					method: 'GET',
					header: {
						'X-WX-SERVICE': 'laravel-06z8',
						'X-WX-OPENID': 'oLmqy5Di2l0DTrZNyEqXqvE9mnB8',
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 2001) {
						// this.typelist.push(result.data.data);
						this.typelist = this.typelist.concat(result.data.data);
						console.log(this.typelist);
					} else {
						uni.showToast({
							title: '您暂无此权限！',
							icon: 'fail',
							duration: 2000
						});
					}
				}
			},
			typeFn(id, i) {
				this.params.cate_id = id;
				this.params.page = 1;
				this.activeIndex = i;
				this.loadingType = 0;
				this.getImgList();
			},
			async getImgList() {
				if (this.loadingType !== 0) {
					return false
				}
				// this.loadingType = 1;
				console.log('start');
				// 显示加载动画
				uni.showNavigationBarLoading();
				const result = await wx.cloud.callContainer({
					config: {
						env: 'prod-1gon0lll2312bfb2',
					},
					path: '/api/wechat/mini/contents/article-list',
					method: 'GET',
					data: this.params,
					header: {
						'X-WX-SERVICE': 'laravel-06z8',
						'X-WX-OPENID': 'oLmqy5Di2l0DTrZNyEqXqvE9mnB8',
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 2001) {
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
						
						if(this.params.page > 1){
							this.list = this.list.concat(resultData);
						}else{
							this.list = resultData;
						}
						this.params.page++;
						console.log(this.list,'list');
						this.loadingType = 0;
						uni.hideNavigationBarLoading();
					} else {
						uni.showToast({
							title: result.data.msg,
							icon: 'fail',
							duration: 2000
						});
						this.list = '';
						this.status = 'noMore';
						uni.hideNavigationBarLoading();
					}

				}
			},
			// 下拉刷新
			onPullDownRefresh() {
				console.log('下拉刷新');
			},
			// 上拉加载
			onReachBottom() {
				setTimeout(() => {
					this.getImgList();
				}, 1000)
			},
			imageFn(data) {
				let dataInfo = JSON.stringify(data);
				console.log(dataInfo);
				uni.navigateTo({
					url: '/pages/image-arr/image-arr?dataInfo=' + dataInfo
				})
			},
			click() {}
		}
	}
</script>

<style lang="scss" scoped>
	.type-box {
		width: 94%;
		padding: 20px 10px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		flex-flow: row wrap;

		.type-item {
			display: inline-block;
			padding: 4px 6px;
		}

		.active {
			color: #f78d39;
		}
	}

	.search-box {
		width: 94%;
		margin: 0 auto;
	}

	.mode-box {
		position: fixed;
		top: 28%;
		right: 0;
		left: 0;
	}

	.container {
		font-size: 14rpx;
		line-height: 24rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
		flex-flow: row wrap;
		min-height: 100px;

		.half {
			width: 49%;
			vertical-align: top;
			margin-bottom: 10px;

			image {
				width: 100%;
			}

			.text-box {
				background-color: #fff;
				padding: 10px 4px;

				.left {
					width: 35%;
				}

				.right {
					width: 63%;
				}

				.left,
				.right {
					display: inline-block;
					font-size: 12px;
					color: #626262;
				}
			}
		}


		.right,
		.left {
			display: inline-block;
			width: 49%;
			vertical-align: top;
		}

		.left {
			margin-right: 2%;
		}

		.left image,
		.right image {
			border-radius: 16rpx;
			width: 100%;
			margin-bottom: 24rpx;
		}
	}
</style>
