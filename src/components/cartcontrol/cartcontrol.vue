<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease " v-show="food.count>0" @click="decreaseCart">
			<span class="inner iconfont  icon-jian"></span>
		</div>
		</transition>
		
		<div class="cart-count " v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add iconfont  icon-jia-copy" @click="addCart"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		props: {
			food: {
				type: Object
			}
			
		},
		created() {
			//			console.log(this.food)
		},
		methods: {
			addCart(event) {
				//移动端 触发一次 pc也触发一次
				if(!event._constructed) {
					return
				}
				// 这个细节比较好 看有么有
				if(!this.food.count) {
					// js 添加一个不存在的字段时 比如food只是引入进来的  直接赋值不生效 需要用到 Vue。set
					Vue.set(this.food, 'count', 1);
					//					this.food.count = 1;
				} else {
					this.food.count++;
				}
			},
			decreaseCart(event) {
				//移动端 触发一次 pc也触发一次
				if(!event._constructed) {
					return
				}
				this.food.count--;
			}
		}
	}
</script>

<style>
	.cartcontrol {
		font-size: 0;
	}
	
	.cartcontrol .cart-decrease{
		display: inline-block;
		
	}
	.cartcontrol .cart-decrease .inner{
		padding: 6px;
		line-height: 24px;
		color: rgb(0, 160, 220);
		font-size: 24px;
		transition: all 0.4s linear;
		transform: rotate(0);
	}
	.cartcontrol .cart-decrease.move-enter,.cartcontrol .cart-decrease.move-leave{
		opacity: 0;
		transform: translate3D(24px,0,0);
	}
	.cartcontrol .cart-decrease.move-enter .inner,.cartcontrol .cart-decrease.move-leave .inner{
		transform: rotate(180deg);
	}
	.cartcontrol .cart-decrease {
		position: relative;
		top: 1px;
		transition: all .4s linear;
	}
	.cartcontrol .cart-decrease.move-transition{
		opacity: 1;
		transform: translate3D(0,0,0);
	}
	.cartcontrol .cart-count {
		display: inline-block;
		vertical-align: top;
		width: 12px;
		padding-top: 6px;
		line-height: 24px;
		text-align: center;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	
	.cartcontrol .cart-add {
		display: inline-block;
		font-size: 24px;
		padding: 6px;
		line-height: 24px;
		color: rgb(0, 160, 220);
	}
</style>