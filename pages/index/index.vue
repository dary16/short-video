<template>
	<view class="container">
		<view>
			<u-swiper :list="list1" @change="change" @click="click"></u-swiper>
		</view>
		<view class="grid-list">
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex" @click="gridFn(listIndex)">
					<view class="icon iconfont" :class="listItem.class" :style="listItem.style"></view>
					<text class="grid-text">{{listItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="goods-list">
			<view class="goods-title">商品列表</view>
			<view v-for="(item,index) in goodsList" :key="index" @click="goodInfo">
				<u-row class="good-box">
					<u-col span="4">
						<div class="flex-content">
							<u-image :src="item.imgUrl" width="90px" height="90px" :lazy-load="true"></u-image>
						</div>
					</u-col>
					<u-col span="8">
						<div class="good-desc">{{item.title}}</div>
						<div class="good-info">
							<view class="good-price">价格：¥{{item.price}}</view>
							<view class="good-tag">
								<u-tag bgColor="#f5cfad" size="mini" color="#f00" shape="circle" borderColor="#f5cfad" :text="item.charge"></u-tag>
							</view>
						</div>
					</u-col>
				</u-row>
			</view>
		</view>
		<u-tabbar
			:value="currentNum"
			@change="changeTab"
			:fixed="true"
			:border="false"
			:placeholder="false"
			:safeAreaInsetBottom="false"
		>
			<u-tabbar-item text="首页" icon="home" @click="click1" ></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account" @click="mineFn" ></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import {getgoodlisturl} from '@/api/api.js';
	import {postlist} from '@/api/request.js';
	export default {
		data() {
			return {
				currentNum: 0,
				testData: {
					name: 'admin',
					age: 18
				},
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
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
						class: 'icon-weijincijiance',
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
				goodsList: [{
						imgUrl: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg',
						title: '活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
						price: '388',
						charge: '高佣78%',
					},
					{
						imgUrl: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg',
						title: '活蟹】湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活生鲜螃蟹现货水产礼盒海鲜水',
						price: '388',
						charge: '高佣68%',
					},
				],
			}
		},
		onLoad() {
			this.getGoodsList();
		},
		methods: {
			change() {},
			changeTab(){},
			click1(){},
			async getGoodsList(){
				let params = {
					page: '2',
					page_size: '10'
				}
				/* uni.request({
					url: 'http://laravel-06z8-26118-6-1316511786.sh.run.tcloudbase.com/contents/goods-list',
					method: 'POST',
					data: params,
					success: (res)=>{
						console.log(res);
					},
					fail: (err)=>{
						console.log(err)
					}
				}) */
				const result = await wx.cloud.callContainer({
					config: {
						env: 'prod-1gon0lll2312bfb2',
					},
				    path: '/api/wechat/mini/contents/goods-list',
				    method: 'GET',
					header: {
						  'X-WX-SERVICE': 'laravel-06z8-011',
						  'X-WX-OPENID': 'oLmqy5Di2l0DTrZNyEqXqvE9mnB8',
						}
				    })
				    console.log(result)
			},
			gridFn(i){
				if(i == 0){
					uni.navigateTo({
						url: '/pages/get-video/get-video'
					})
				}else if(i == 1){
					uni.navigateTo({
						url: '/pages/get-text/get-text'
					})
				}else if(i == 2){
					uni.navigateTo({
						url: '/pages/get-module/get-module'
					})
				}else if(i == 3){
					uni.navigateTo({
						url: '/pages/get-forbid/get-forbid'
					})
				}
			},
			mineFn(){
				uni.navigateTo({
					url: '/pages/mine/mine'
				})
			},
			goodInfo(){
				let dataInfo =  JSON.stringify(this.testData);
				uni.navigateTo({
					url: '/pages/good-info/good-info?dataInfo='+ dataInfo
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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

			.grid-text {
				padding: 10px 4px;
				font-size: 12px;
			}
		}

		.goods-list {
			width: 100%;
			margin: 0 auto;
			margin-bottom: 50px;

			.goods-title {
				font-size: 16px;
				font-weight: bold;
				padding: 10px;
				text-align: left;
			}
			.good-box{
				width: 96%;
				margin: 0 auto;
				background-color: #fff;
				border-radius: 8px;
				padding: 5px 10px;
				margin-bottom: 10px;
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
					color: #f00;
					font-size: 14px;
					display: inline-block;
				}

				.good-tag {
					float: right;
				}
			}
		}
	}
</style>
