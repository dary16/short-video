<template>
	<view>
		<u-swiper :list="list" @change="e => current = e.current" :autoplay="false" height="400">
			<view slot="indicator" class="indicator">
				<view class="indicator__dot" v-for="(item, index) in list" :key="index"
					:class="[index === current && 'indicator__dot--active']">
				</view>
			</view>
		</u-swiper>
		<view class="swiper-text">
			<view class="left-text">
				<view class="left">
					<view class="text-top">专属高佣</view>
					<view class="text-bottom">40%</view>
					<!-- <u--text color="#fff" size="13" text="专属高佣"></u--text>
					<u--text :block="false" size="18" color="#fff" text="40%"></u--text> -->
				</view>
				<view class="center">
					<view class="text-top">价格</view>
					<view class="text-bottom">¥9.90</view>
				</view>
			</view>
			<view class="right-text">
				<view class="right">
					<view class="text-top">距结束</view>
					<view class="text-bottom">
						<u-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm:ss" autoStart millisecond>
							<view class="time">
								<text class="time__item">{{ timeData.day }}&nbsp;天</text>
								<text
									class="time__item">{{ timeData.hour>=10?timeData.hour:'0'+timeData.hour}}&nbsp;时</text>
								<text class="time__item">{{ timeData.min }}&nbsp;分</text>
								<text class="time__item">{{ timeData.second }}&nbsp;秒</text>
							</view>
						</u-count-down>
					</view>
				</view>
			</view>
		</view>
		<view class="list-wrap">
			<view class="list-box">
				<view class="list-title">{{dataList.title}}</view>
				<view class="list-block">
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="3">
							<u--text type="info" size="14" :block="true" text="已售件数"></u--text>
						</u-col>
						<u-col span="9">
							{{dataList.saleNum}}
						</u-col>
					</u-row>
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="3">
							<u--text type="info" size="14" :block="true" text="发货地"></u--text>
						</u-col>
						<u-col span="9">
							{{dataList.sendAddress}}
						</u-col>
					</u-row>
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="3">
							<u--text style="width: 80px;" type="info" size="14" :block="false" text="开始时间">
							</u--text>
						</u-col>
						<u-col span="9">
							<u--text :block="true" :text="dataList.startDay"></u--text>
						</u-col>
					</u-row>
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="3">
							<u--text type="info" :block="true" size="14" text="结束时间"></u--text>
						</u-col>
						<u-col span="9">
							<u--text :block="true" :text="dataList.endDay"></u--text>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
		<view class="list-wrap">
			<view class="list-box">
				<view class="shop-name">{{dataList.storeName}}</view>
				<view class="list-ul">
					<view class="list-li">
						<u--text align="center" size="18" :text="dataList.storeScore"></u--text>
						<u--text align="center" size="12" type="info" text="商家体验分"></u--text>
					</view>
					<view class="list-line">
						<u-line direction="col"></u-line>
					</view>
					<view class="list-li">
						<view class="rate">
							<text class="score">{{dataList.goodScore}}</text>
							<text class="level" v-if="dataList.goodScore >= 4.8">高</text>
							<text class="level" v-else-if="dataList.goodScore >= 4.6 && dataList.goodScore < 4.8">中</text>
							<text class="level" v-else>低</text>
						</view>
						<u-text align="center" size="12" type="info" text="商品体验"></u-text>
					</view>
					<view class="list-li">
						<view class="rate">
							<text class="score">{{dataList.goodService}}</text>
							<text class="level" v-if="dataList.goodService >= 4.8">高</text>
							<text class="level" v-else-if="dataList.goodService >= 4.6 && dataList.goodService < 4.8">中</text>
							<text class="level" v-else>低</text>
						</view>
						<u--text align="center" size="12" type="info" text="商品服务"></u--text>
					</view>
					<view class="list-li">
						<view class="rate">
							<text class="score">{{dataList.logisticsScore}}</text>
							<text class="level" v-if="dataList.logisticsScore >= 4.8">高</text>
							<text class="level" v-else-if="dataList.logisticsScore >= 4.6 && dataList.logisticsScore < 4.8">中</text>
							<text class="level" v-else>低</text>
						</view>
						<u--text align="center" size="12" type="info" text="物流体验"></u--text>
					</view>
				</view>
			</view>
		</view>
		<view class="list-line">
			<u-loadmore loadmoreText="商品详情" line />
		</view>
		<view class="list-img" v-for="(item,index) in list" :key="index">
			<u--image :showLoading="true" :src="item" mode="widthFix"></u--image>
		</view>
		<view class="list-bottom">
			<u-row customStyle="margin-bottom: 10px" gutter="10">
				<u-col span="6">
					<u--text type="primary" :plain="true" text="新手帮助" align="center"></u--text>
				</u-col>
				<u-col span="6">
					<u-button type="primary" text="复制商品链接"></u-button>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					'../../static/goods-images/1.png',
					'../../static/goods-images/2.png',
					'../../static/goods-images/3.png',
					'../../static/goods-images/4.png'
				],
				current: 0,
				timeData: {
					day: 0,
					hour: 0,
					min: 0,
					second: 0
				},
				dataList: {
					title: '味仙居[完全不辣]不辣的麻辣香锅底料炒酱香干锅调料包A',
					saleNum: '2.5w',
					sendAddress: '48小时内从河南省发货，包邮',
					startDay: '2022-12-22',
					endDay: '2023-10-21',
					storeName: '味仙居官方旗舰店',
					storeScore: '4.89',
					goodScore: '4.09',
					goodService: '4.98',
					logisticsScore: '4.87'
				},
				imgList: [{
					src: ''
				}]
			};
		},
		onLoad(v) {
			let data = JSON.parse(v.dataInfo);
			console.log(data, this)
			this.getTime();
		},
		mounted() {
			
		},
		methods:{
			async getTime(){
				function timeStamp(times){
					let timestamp = Date.parse(new Date());
					timestamp = timestamp / 1000;
					let letime = times -timestamp;
					let time = parseInt(letime);
					if(parseInt(letime) > 60){
						let second = parseInt(letime) % 60;
						let min = parseInt(letime / 60);
						// 直接返回字符串格式：
						// time = min + "分" + second + "秒";
						// 返回对象格式：
						time = {
							min: min,
							second: second
						}
						if(min > 60){
							min = parseInt(letime / 60) % 60;
							let hour = parseInt(parseInt(letime / 60) / 60);
							// 直接返回字符串格式： 
							// time = hour + "时" + min + "分" + second + "秒";
							// 返回对象格式
							time = {
								hour: hour,
								min: min,
								second: second
							}
							if(hour >= 24){
								hour = parseInt(parseInt(letime / 60) / 60) % 24;
								let day = parseInt(parseInt(parseInt(letime / 60) / 60) / 24);
								// 直接返回字符串格式
								// time = day + "天" + hour + "时" + min + "分" + second + "秒";
								// 返回对象格式
								time = {
									day: day,
									hour: hour,
									min: min,
									second: second
								}
							}
						}
						
					}
					// 判断是否小于10，小于10就补0
					if(time.day < 10){
						time.day = '0' + time.day
					}else if(time.day == undefined){
						time.day = '00'
					}
					if(time.hour < 10){
						time.hour = '0' + time.hour
					}else if(time.hour == undefined){
						time.hour = '00'
					}
					if(time.min < 10){
						time.min = '0' + time.min
					}else if(time.min == undefined){
						time.min = '00'
					}
					if(time.second < 10){
						time.second = '0' + time.second
					}
					return time;
				}
				setInterval(()=>{
					this.hastime = timeStamp(1700200897);
					this.timeData = this.hastime;
					console.log(this.timeData)
				},1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;

			&--active {
				background-color: #ffffff;
			}
		}
	}

	.swiper-text {
		position: relative;
		background-color: #dd4d33;
		color: #fff;
		margin-bottom: 10px;
		height: 56px;

		.right-text {
			height: 40px;
			text-align: right;
			width: 56%;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			padding: 4px;

			.right {
				width: 100%;
				display: inline-block;
				text-align: center;
				.text-top{
					font-size: 13px;
				}
				.text-bottom {
					font-size: 16px;
				}
				.time{
					font-size: 15px;
				}
			}
		}

		.left-text {
			position: absolute;
			padding: 10px;
			width: 44%;
			height: 40px;
			left: 0;
			bottom: 0;
			z-index: 9;

			.left {
				width: 50%;
				display: inline-block;
				text-align: center;
				.text-top {
					font-size: 13px;
				}
				
				.text-bottom {
					font-size: 16px;
				}
			}

			.center {
				width: 50%;
				display: inline-block;
				text-align: center;

				.text-top {
					font-size: 13px;
				}

				.text-bottom {
					font-size: 16px;
				}
			}
		}
	}

	.list-wrap {
		width: 94%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 8px;

		.list-box {
			margin-bottom: 10px;
			padding: 10px;

			.list-title,
			.shop-name {
				padding: 10px;
				font-size: 16px;
				font-weight: bold;
			}

			.list-block {
				padding: 0 10px;
			}

			.list-ul {
				display: flex;

				.list-li {
					font-size: 12px;
					flex: 1;
					.rate{
						font-size: 15px;
						text-align: center;
						.score{
							
						}
						.level{
							display: inline-block;
							width: 20px;
						}
					}
				}
				.list-line{
					width: 10px;
				}
			}
		}
	}

	.list-line {
		padding: 10px;
	}

	.list-img {
		margin-bottom: 10px;
	}

	.inline-text {
		display: inline-block;
		width: 80px;
	}

	.list-bottom {
		width: 94%;
		margin: 0 auto;
		padding: 10px;
	}
</style>
