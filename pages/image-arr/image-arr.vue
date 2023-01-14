<template>
	<view>
		<view class="img-list">
			<u-swiper :list="list1"
			height="600px"
			indicator
            indicatorMode="line"
            circular></u-swiper>
		</view>
		<view class="save-img">
			<u-button type="primary" text="保存图片到系统相册" @click="saveImg"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				]
			};
		},
		methods:{
			saveImg(){
				uni.downloadFile({
				        url: 'https://www.abc123.png',
				        success: (res) =>{
				            if (res.statusCode === 200){
				                uni.saveImageToPhotosAlbum({
				                    filePath: res.tempFilePath,
				                    success: function() {
				                        uni.showToast({
				                            title: "保存成功",
				                            icon: "none"
				                        });
				                    },
				                    fail: function() {
				                        uni.showToast({
				                            title: "保存失败",
				                            icon: "none"
				                        });
				                    }
				                });
				            }
				        }
				    })
			}
		}
	}
</script>

<style lang="scss" scoped>
.img-list{
	width: 94%;
	margin: 0 auto;
}
.save-img{
	text-align: center;
	position: fixed;
	left: 20%;
	right: 20%;
	bottom: 4%;
}
</style>
