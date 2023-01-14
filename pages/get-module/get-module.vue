<template>
	<view>
		<view class="search-box">
			<u-row customStyle="margin-bottom: 10px">
				<u-col span="10">
					<u-search shape="round" v-model="keyword" :showAction="false" :clearabled="true" placeholder="请输入搜索词"></u-search>
				</u-col>
				<u-col span="2">
					<u-button type="primary" size="small" shape="circle" text="搜索"></u-button>
				</u-col>
			</u-row>
			<view class="tab-title">
				<u-tabs :list="list" :current="current" @click="click"></u-tabs>
				<list-item :dataList="dataList1"></list-item>
				<list-item :dataList="dataList2"></list-item>
			</view>
			<view class="container">
				<view class="left">
					<view class="posive" v-for="(item,index) in leftList" :key="index">
						<image :src="item.src" @click="imageFn"></image>
					</view>
				</view>
				<view class="right">
					<view class="posive" v-for="(item,index) in rightList" :key="index">
						<image :src="item.src" @click="imageFn"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import listItem from '../components/list-item/list-item.vue'
	export default {
		data() {
			return {
				keyword: '',
				current: 0,
				leftList: [],
				rightList: [],
				leftH: 0,
				rightH: 0,
				list: [{
                    name: '关注',
					id: 0
                }, {
                    name: '推荐',
					id: 1
                }, {
                    name: '电影',
					id: 2
                }, {
                    name: '科技',
					id: 3
                }, {
                    name: '音乐',
					id: 4
                }, {
                    name: '美食',
					id: 5
                }, {
                    name: '文化',
					id: 6
                }, {
                    name: '财经',
					id: 7
                }, {
                    name: '手工',
					id: 8
                }],
				dataList1:[{
					name: '全部',
					id: 1
				},{
                    name: '关注1',
					id: 2
                }, {
                    name: '推荐1',
					id: 3
                }, {
                    name: '电影1',
					id: 4
                }, {
                    name: '科技1',
					id: 5
                }, {
                    name: '音乐1',
					id: 6
                }, {
                    name: '美食1',
					id: 7
                }, {
                    name: '文化1',
					id: 8
                }],
				dataList2:[{
					name: '全部2',
					id: 1
				},{
				    name: '关注2',
					id: 2
				}, {
				    name: '推荐3',
					id: 3
				}, {
				    name: '电影4',
					id: 4
				}, {
				    name: '科技5',
					id: 5
				}, {
				    name: '音乐6',
					id: 6
				}, {
				    name: '美食7',
					id: 7
				}, {
				    name: '文化8',
					id: 8
				}],
				imgList: [
					{
						src: "../../static/module-images/1.png"
					},
					{
						src: "../../static/module-images/2.png"
					},
					{
						src: "../../static/module-images/3.png"
					},
					{
						src: "../../static/module-images/4.png"
					},
					{
						src: "../../static/module-images/5.png"
					},
					{
						src: "../../static/module-images/6.png"
					},
					{
						src: "../../static/module-images/7.png"
					},
					{
						src: "../../static/module-images/8.png"
					},
					{
						src: "../../static/module-images/9.png"
					},
					{
						src: "../../static/module-images/10.png"
					}
				]
			};
		},
		components: {
			listItem,
		},
		onLoad(){
			this.doList();
		},
		methods: {
			doList(){
				const that = this;
				this.imgList.forEach(res=>{
					console.log(res)
					uni.getImageInfo({
						src: res.src,
						success: (image) => {
							console.log(res.src,666);
							// 计算图片渲染高度
							let showH = (50 * image.height) / image.width;
							// 判断左右盒子的高度
							if(that.leftH <= that.rightH){
								that.leftList.push(res);
								that.leftH += showH;
							}else{
								that.rightList.push(res);
								that.rightH += showH;
							}
						}
					})
				})
			},
			imageFn(){
				uni.navigateTo({
					url: '/pages/image-arr/image-arr'
				})
			},
			click(){}
		}
	}
</script>

<style lang="scss" scoped>
.search-box{
	width: 94%;
	margin: 0 auto;
}
.container{
	font-size: 14rpx;
	line-height: 24rpx;
	display: flex;
	justify-content: space-between;
	.right, .left{
		display: inline-block;
		width: 340rpx;
		vertical-align: top;
	}
	.left image, .right image{
		border-radius: 16rpx;
		width: 100%;
		margin-bottom: 24rpx;
	}
}
</style>
