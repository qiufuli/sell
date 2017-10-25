<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item">
			
		</span>
	</div>
</template>

<script>
	const length = 5;
	const cls_on = "on";
	const cls_half = "half";
	const cls_off = "off";
	export default{
		//props的值是从父组件中获取的 需要什么值就写什么值 
		//这个值 在父元素中用 该组件标签的 属性值传递也可以 <star :size="11" :score="seller.score"></star>
		props:['size','score'],
		computed:{
			starType(){
				return 'star-' + this.size;
			},
			itemClasses(){
				let result = [];
				//取整
				let score = Math.floor(this.score * 2) / 2;
				// 看它有没有余数 有的话就给个半心
				let hasDecimal = score % 1 !==0;
				//看它的整数部分
				let integer = Math.floor(score);
				for(let i=0;i<integer;i++){
					result.push(cls_on)
				}
				if(hasDecimal){
					result.push(cls_half)
				}
				while(result.length < length){
					result.push(cls_off)
				}
				return result;
			}
		}
	}
</script>

<style>
	.star{
		font-size: 0;
	}
	.star .star-item{
		display: inline-block;
		background-repeat: no-repeat;
	}
	.star.star-48 .star-item{
		width: 20px;
		height: 20px;
		margin-right: 22px;
		background-size: 20px 20px;
	}
	.star .star-item:last-child{
		margin-right: 0;
	}
	.star.star-48 .star-item.on{
		background-image: url("img/star48_on@2x.png");
	}
	.star.star-48 .star-item.half{
		background-image: url("img/star48_half@2x.png");
	}
	.star.star-48 .star-item.off{
		background-image: url("img/star48_off@2x.png");
	}
	.star.star-24 .star-item{
		width: 10px;
		height: 10px;
		margin-right: 3px;
		background-size: 10px 10px;
	}
	.star.star-24 .star-item.on{
		background-image: url("img/star24_on@2x.png");
	}
	.star.star-24 .star-item.half{
		background-image: url("img/star24_half@2x.png");
	}
	.star.star-24.star-item.off{
		background-image: url("img/star24_off@2x.png");
	}
	.star.star-36 .star-item{
		width: 15px;
		height: 15px;
		margin-right: 6px;
		background-size: 15px 15px;
	}
	.star.star-36 .star-item.on{
		background-image: url("img/star36_on@2x.png");
	}
	.star.star-36 .star-item.half{
		background-image: url("img/star36_half@2x.png");
	}
	.star.star-36.star-item.off{
		background-image: url("img/star36_off@2x.png");
	}
	.star{}
</style>