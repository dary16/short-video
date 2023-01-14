<template>
	<view>
		<u-row ref="listDom" class="item" id="txt" customStyle="margin-bottom: 10px">
			<u-col span="11">
				<view class="tab-item" :class="{ spreadSty: !isSpread }">
					<view class="tab-ul">
						<view class="tab-li" v-for="(item,index) in dataList" :key="index">
							{{item.name}}
						</view>
					</view>
				</view>
			</u-col>
			<u-col span="1" v-if="showBtn" @click="isSpread = !isSpread">
				<u-icon v-if="isSpread" name="arrow-down"></u-icon>
				<u-icon v-else name="arrow-up"></u-icon>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name: "list-item",
		props:['dataList'],
		data() {
			return {
				showBtn: true,
				isSpread: true
			};
		},
		watch:{
			// "listData.id":{
			// 	immediate: true,
			// 	handler(){
			// 		this.$nextTick(()=>{
			// 			const { clientHeight,scrollHeight } = this.$refs.listDom;
						
			// 			this.showBtn = scrollHeight > clientHeight;
			// 		})
			// 	}
			// }
		},
		mounted() {
			this.getHeight();
			// this.$nextTick(()=>{
			// 	let info =uni.createSelectorQuery().in(this).select('.item');
			// 	info.boundingClientRect(data=>{
			// 		console.log(data,999);
			// 	})
			// })
			// let info = uni.createSelectorQuery().in(this).select('.tab-item').boundingClientRect(result=>{
			// 	if(result){
			// 		console.log('===========',result)
			// 	}
			// });
			// console.log(info.boundingClientRect(data=>{}));
			// info.boundingClientRect(data=>{
			// 	console.log(data,1);
			// })
			// console.log(this.$refs.listDom,1);
		},
		methods:{
			getHeight(){
				let query = uni.createSelectorQuery();
				query.select('#txt').boundingClientRect(data=>{
					console.log(data);
					let height = data.height
					console.log(height,666)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item{
		// text-align: left;
		// display: -webkit-box;
		// -webkit-line-clamp: 1;
		// -webkit-box-orient: vertical;
		// text-overflow: ellipsis;
		// overflow: hidden;
		// line-height: 20px;
		margin-top: 20px;
		.tab-item{
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				overflow: hidden;
				&.spreadSty{
					-webkit-line-clamp: 99;
				}
				.tab-ul{
					word-break: break-all;
					.tab-li{
						&:first-child{
							background-color: #eaedf9;
							color: #6077da;
						}
						margin-right: 5px;
						display: inline-block;
						padding: 5px;
						border-radius: 8px;
					}
				}
			}
	}

</style>
