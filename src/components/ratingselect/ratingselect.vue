<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="block positive" :class="{'active':emitSelectType===2}">
				{{desc.all}}
				<span class="count">{{ratings.length}}</span>
			</span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':emitSelectType===0}">
				{{desc.positive}}
				<span class="count">{{positives.length}}</span>
			</span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':emitSelectType===1}">
				{{desc.negative}}
				<span class="count">{{negatives.length}}</span>
			</span>
		</div>
		<div @click="toggleContent" class="switch" :class="{'on':emitonlyContent}">
			<span class="iconfont icon-checkOn"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	import {sellEmit} from '@/common/js/sellEmit'
	//评价类型 好评 吐槽 全部 0 1 2默认为2  全部
	const POSITIVE = 0;
	const NEGATIVE = 1;
	// 不定义的话 直接引用ALL 会报错 undefined！！！
	const ALL = 2;
	export default {
		props: {
			// 评价  是个数组 只要是对象 一定要返回一个函数
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			// 只显示有内容的 布尔值
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		data(){
			return{
				emitSelectType:this.selectType,//创建props属性需要双向传递的副本
				emitonlyContent:this.onlyContent//创建props属性需要双向传递的副本
			}
		},
//		watch:{
//			selectType(val){
//				this.emitSelectType = val;
//				//console.log("这是副本数据打印出来说明获取到了",this.emitSelectType)
//			},
//			onlyContent(val){
//				this.emitonlyContent = val;
//				//console.log("这是副本数据打印出来说明获取到了",this.emitonlyContent)
//			},
//			emitSelectType(val){
//				// 派发一个事件告诉父组件 监听这个时间
//				sellEmit.$emit('ratingtype.select', val);
//			},
//			emitonlyContent(val){
//				sellEmit.$emit('content.toggle', val);
//			}
//			
//		},
		computed: {
			//filter返回的是数组  表扬的数组 和吐槽的数组
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				});
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				});
			},
			
		},
		methods: {
			select(type, event) {
				if(!event._constructed) {
					return;
				}
				this.emitSelectType = type;
				sellEmit.$emit('ratingtype.select', this.emitSelectType);
				
			},
			toggleContent(event) {
				if(!event._constructed) {
					return;
				}
				this.emitonlyContent = !this.emitonlyContent;
				sellEmit.$emit('content.toggle', this.emitonlyContent);
				
			}
		}
	}
</script>

<style>
	.ratingselect {}
	
	.ratingselect .rating-type {
		padding: 18px 0;
		margin: 0 18px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		font-size: 0;
	}
	
	.ratingselect .rating-type .block {
		display: inline-block;
		padding: 8px 12px;
		margin-right: 8px;
		line-height: 16px;
		border-radius: 1px;
		font-size: 12px;
		color: rgb(77, 85, 93);
	}
	
	.ratingselect .rating-type .block.active {
		color: #fff;
	}
	
	.ratingselect .rating-type .block .count {
		margin-left: 2px;
		font-size: 8px;
	}
	
	.ratingselect .rating-type .block.positive {
		background: rgba(0, 160, 220, 0.2);
	}
	
	.ratingselect .rating-type .block.negative {
		background: rgba(77, 85, 93, 0.2);
	}
	.ratingselect .rating-type .all .active {
		background: rgb(0, 160, 220);
	}
	.ratingselect .rating-type .positive.active {
		background: rgb(0, 160, 220);
	}
	
	.ratingselect .rating-type .negative.active {
		background: rgb(77, 85, 93);
	}
	
	.ratingselect .switch {
		padding: 12px 18px;
		line-height: 24px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		color: rgb(147, 153, 159);
		font-size: 0;
	}
	
	.ratingselect .switch .icon-checkOn {
		display: inline-block;
		vertical-align: top;
		margin-right: 4px;
		font-size: 20px;
		
	}
	.ratingselect .switch.on .icon-checkOn{
		color: green;
	}
	.ratingselect .switch .text {
		display: inline-block;
		vertical-align: top;
		font-size: 12px;
	}
</style>