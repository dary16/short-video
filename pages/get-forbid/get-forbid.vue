<template>
	<view>
		<view class="title">违禁词检测</view>
		<view class="text-wrap">
			<u--textarea v-model="value" placeholder="请输入待检测内容" @blur="blurFn" confirmType="done"></u--textarea>
		</view>
		<view class="text-wrap">
			<u-row class="btn-group" justify="space-between" gutter="10">
				<u-col span="6">
					<u-button type="primary" :plain="true" :text="text" @click="doFn()"></u-button>
				</u-col>
				<u-col span="6">
					<u-button type="primary" text="立即检测" @click="check"></u-button>
				</u-col>
			</u-row>
		</view>
		<view class="text-wrap" v-show="show">
			<view class="title">检测结果</view>
			<view class="forbid-result">
				包含违禁词
				<u--text type="warning" :text="forbidText"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				description: '已为您提取原视频',
				text: '粘贴内容',
				show: false,
				forbidText: ''
			};
		},
		methods:{
			doFn(){
				if(this.text == '粘贴内容'){
					uni.getClipboardData({
						success: function (res) {
							console.log(res.data);
							this.value = res.data;
							this.text = '清空内容'
						}
					});
				}else{
					this.value = '';
					this.text = '粘贴内容';
				}
				
			},
			check(){
				this.show = true;
				this.forbidText = '傻逼'
			},
			blurFn(){
				if(this.value != ''){
					this.text = '清空内容'
				}
				console.log('失去焦点');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		font-size: 16px;
		font-weight: bold;
		padding: 10px;
		text-align: left;
	}

	.text-wrap {
		width: 96%;
		border-radius: 8px;
		margin: 0 auto;
		margin-bottom: 20px;

		.btn-group {
			margin-top: 20px;
			text-align: center;

			.left-btn {
				width: 150px;
				display: inline-block;
				margin-right: 20px;
			}

			.right-btn {
				width: 150px;
				display: inline-block;
			}
		}

		.video-wrap {
			padding: 10px;

			.video {
				width: 151px;
			}
			.video-text{
				width: 100%;
				margin: 0 auto;
				.video-alert{
					margin: 0 auto;
				}
				.save-picture{
					margin-top: 20px;
					button{
						width: 160px;
						margin: 0 auto;
					}
				}
			}
		}
		.forbid-result{
			width: 96%;
			border-radius: 8px;
			margin: 0 auto;
			background-color: #fff;
			padding: 5px 10px;
		}
	}

</style>
