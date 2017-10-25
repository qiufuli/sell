<template>
	<div class="shopcart">
		<transition name="fade">
			<div class="list-mask" @click="hideList" v-show="listShow"></div>
		</transition>
		
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo " :class="{highlight:totalCount>0}">
						<i class="icon-shopping_cart"></i>
					</div>
					<div class="num" v-show="totalCount>0">
					{{totalCount}}
					</div>
				</div>
				
				<div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}元</div>
				<div class="desc">
					另需配送费￥{{deliveryPrice}}元
				</div>
			</div>
			<!-- 阻止冒泡事件 vue提供的 @click.stop.prevent-->
			<div class="content-right" @click.stop.prevent="pay">
				<div class="pay" :class="payClass">
					{{payDesc}}
					
				</div>
			</div>
		</div>
		<div class="ball-container">
			
			<div transition="drop" v-for="ball in balls" v-show="ball.show" class="ball"></div>
			<div class="inner"></div>

		</div>
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<div class="title">购物车</div>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import cartcontrol from '@/components/cartcontrol/cartcontrol'
	export default{
		props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data(){
    	return{
    		balls:[
    		{
    			show:false
    		},
    		{
    			show:false
    		},
    		{
    			show:false
    		},
    		{
    			show:false
    		},
    		{
    			show:false
    		}
    		],
    		fold:true
    	}
    },
		created(){
			
		},
		computed:{
			totalPrice(){
				let total = 0;
				this.selectFoods.forEach((food)=>{
					total += food.price * food.count ;
				})
				return total
			},
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((food)=>{
					count +=food.count ;
				})
				return count;
			},
			payDesc(){
				if(this.totalPrice === 0){
					return '￥'+this.minPrice+'元起送'
				}else if(this.totalPrice<this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return '还差￥' + diff + '元起送'
 				}else{
 					return '去结算'
 				}
			},
			payClass(){
				if(this.totalPrice<this.minPrice){
					return 'not-enough';
				}else{
					return 'enough';
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if(show){
					this.$nextTick(()=>{
						// 判断 如果有scroll了就不创建了 
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.listContent,{
							click:true
							})
						}else{
							//refresh 刷新
							this.scroll.refresh();
						}
						
					})
				}
				return show;
			}
		},
		components:{
			cartcontrol
		},
		methods:{
			toggleList(){
				if(!this.totalCount){
					return;
				}
				this.fold = !this.fold;
			},
			empty(){
				this.selectFoods.forEach((food)=>{
					food.count = 0;
				})
			},
			hideList(){
				this.fold = !this.fold;
			},
			pay(){
				if(this.totalPrice < this.minPrice){
					return;
				}
				window.alert("支付"+this.totalPrice+"元")
			}
		}
	}
</script>

<style>
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
	}
	.list-mask{
		position: fixed;
		left: 0;
		top: 0;
		z-index: -2;
		width: 100%;
		height:100%;
		opacity: 1;
		background: rgba(7,17,27,0.6);
	}
	.list-mask.fade-enter,.list-mask.fade-leave-to{
		background: rgba(7,17,27,0);
	}
	.list-mask.fade-enter-active,.list-mask.fade-leave-active{
		transition: all .5s;
	}
	.shopcart .content{
		display: flex;
		background-color: #141d27;
	}
	.shopcart .content .content-left{
		flex: 1;
	}
	.shopcart-list{
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		background-color: #fff;
		/* 给哪个加动画 必须写上下面这条 就给最终的展现形式*/
		transform: translate3d(0,-100%,0);
	}
	.shopcart-list.fold-enter-active{
		transition: all .5s;	
	}
	.shopcart-list.fold-leave-active{
		transition: all .5s;	
	}
	/* 这种也可以 就写2个
	 * .shopcart-list.fold-enter{
		transform: translate3d(0,0,0);
	}
	.shopcart-list.fold-leave-to{
		transform: translate3d(0,0,0);
	}*/
	.shopcart-list.fold-enter{
		transform: translate3d(0,0,0);
	}
	.shopcart-list.fold-enter-to{
		transform: translate3d(0,-100%,0);
	}
	.shopcart-list.fold-leave{
		transform: translate3d(0,-100%,0);
	}
	.shopcart-list.fold-leave-to{
		transform: translate3d(0,0,0);
	}
	.shopcart-list .list-header{
		height: 40px;
		line-height: 40px;
		padding: 0 18px;
		background: #f3f5f7;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		
	}
	.list-header .title{
		float: left;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.list-header .empty{
		float: right;
		font-size: 12px;
		color: rgb(0,160,220);
	}
	.shopcart-list .list-content{
		padding: 0 18px;
		max-height: 217px;
		overflow: hidden;
	}
	.shopcart-list .list-content .food{
		position: relative;
		padding: 12px 0 ;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.shopcart-list .list-content .name{
		line-height: 24px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.shopcart-list .list-content .price{
		position: absolute;
		right: 90px;
		bottom: 12px;
		line-height: 24px;
		font-weight: bold;
		font-size: 14px;
		color: rgb(240,20,20);
	}
	.shopcart-list .list-content .cartcontrol{
		position: absolute;
		right: 0;
		bottom: 6px;
	}
	
	.content-left .logo-wrapper{
		display: inline-block; 
		position: relative;
		top: -10px;
		margin: 0 7px ;
		padding: 6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		vertical-align: top;
		border-radius: 50%;
		background: #141d27;
		position: relative;
	}
	.content-left .logo{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #2b343c;
		text-align: center;
	}
	.content-left .logo.highlight{
		background: rgb(0,160,220);
	}
	.content-left .logo .icon-shopping_cart{
		display: inline-block;
		font-size: 24px;
		color: #80858a;
		line-height: 33px;
		width: 33px;
		height: 33px;
		background:url("../../../static/img/shopIcon.png") no-repeat;
		background-size: 33px 33px;
		position: relative;
		top: 5px;
	}
	.content-left .logo.highlight .icon-shopping_cart{
		color: #fff;
	}
	.content-left .price{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin-top: 12px;
		box-sizing: border-box;
		padding-right: 12px;
		border-right: 1px solid rgba(255,255,255,0.1);
		font-size: 16px;
		font-weight: 700;
		color: rgba(255,255,255,0.4);
	}
	.content-left .price.highlight{
		color: #fff;
	}
	.content-left .desc{
		display: inline-block;
		color: rgba(255,255,255,0.4);
		vertical-align: top;
		line-height: 24px;
		margin:12px 0 0 12px ;
		font-size: 12px;
	}
	.logo-wrapper .num{
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		background: red;
		border-radius: 16px;
		color: #fff;
		font-weight: bold;
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
		text-align: center;
		font-size: 9px;
	}
	.shopcart .content .content-right{
		flex: 0 0 105px;
		width: 105px;
	}
	.content-right .pay{
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 12px;
		color:rgba(255,255,255,0.4);
		font-weight: 700;
		background-color: #2b333b;
	}
	.content-right .pay.not-enough{
		background-color: #2b333b;
	}
	.content-right .pay.enough{
		background-color: #00b43c;
		color: #fff;
	}
	.ball-container{
		
	}
	.ball-container .ball{
		positon: fixed;
		bottom: 22px;
		left: 22px;
		z-index: 200;
	}
	.ball.drop-transition{
		transition: all .4s;
	}
	.ball .inner{
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgb(0,160,220);
		transition: all .4s;
	}

</style>