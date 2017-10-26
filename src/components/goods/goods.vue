<template>
	<div class="goods">
		<div class="menu-warpper" ref="menu">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classmap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-warpper" ref="foods">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook"> 
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img :src="food.icon" alt="" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<!--goods.vue组件中使用v-on来监听-->
									<cartcontrol :food="food" ></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
				
			</ul>
			
		</div>
		<!--v-el 2.0中已经废弃全部采用ref和$refs-->
		<shopcart ref="shopcart"  :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		<food :food="selectedFood" ref="food"></food>
	</div>
	
</template>

<script>
	import BScroll from 'better-scroll'
	import shopcart from '@/components/shopcart/shopcart'
	import cartcontrol from '@/components/cartcontrol/cartcontrol'
	import food from '@/components/food/food'
	export default{
		props:["seller"],
		data(){
			return{
				goods:[],
				listHeight:[],
				scrollY:0,
				selectedFood:{}
			}
		},
		components:{
			shopcart,
			cartcontrol,
			food
		},
		computed:{
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || this.scrollY>=height1 && this.scrollY < height2){
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food);
						}
					})
				});
				return foods;
			}
		},
		created(){
			this.classmap = ['decrease','discount','guarantee','invoice','special'];
			// $refs 可以获取dom元素 这个比较好  有个连招 :::: ref="a"  this.$refs.a获取到dom对象   $nextTick(()=>{}) 与DOM相关操作写在该函数回调中，确保DOM已渲染
			console.log("11111",this.$refs)
			this.$http.get('../static/data.json').then((response)=>{
					response = response.body;
  					this.goods = response.goods;
  					this.$nextTick(()=>{
  						//对dom进行渲染的话 必须放到$nextTick方法里  记住！！！！！
  					this._initScroll();
  					//左右联动  666
  					this._calculateHeight();
  					})
			})
		},
		methods:{
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menu,{
					click:true
				});
				this.foodsScroll = new BScroll(this.$refs.foods,{
					probeType:3,
					click:true
				});
				this.foodsScroll.on('scroll',(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight(){
				let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item = foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height)
				}
				console.log(this.listHeight)
			},
			//点左侧 右侧滚动
			selectMenu(index,event){
				//移动端是触发一次 pc触发两次 用下面这个解决 pc浏览器中没有那个属性就不触发
				if(!event._constructed){
					return;
				}
				let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,300)
			},
			selectFood(food,event){
				if(!event._constructed){
					return;
				}
				this.selectedFood = food;
				this.$nextTick(()=>{
					this.$refs.food.show();
				})
				
			}
			
		}
	}
</script>

<style>
	.goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
	}
	.goods .menu-warpper{
		flex: 0 0 80px ;
		width: 80px;
		background-color: #f3f5f7;
	}
	.menu-warpper .menu-item{
		display: table;
		height: 54px;
		width: 56px;
		line-height: 14px;
		padding: 0 12px;
	}
	.menu-warpper .current{
		position: relative;
		z-index: 10;
		margin-top: -1px;
		background: #fff;
		font-weight: 700;
	}
	.menu-warpper .current .text{
		border-bottom: none;
	}
	.menu-item .icon{
		display: inline-block;	
		width: 16px;
		height: 16px;
		margin-right: 4px;
		background-size: 16px 16px;
		background-repeat: no-repeat;
		vertical-align: middle;
	}
	.menu-item .icon.decrease{
		background-image:url("../../../static/img/decrease_3@2x.png");
	}
	.menu-item .icon.discount{
		background-image:url("../../../static/img/discount_3@2x.png");
	}
	.menu-item .icon.guarantee{
		background-image:url("../../../static/img/guarantee_3@2x.png");
	}
	.menu-item .icon.invoice{
		background-image:url("../../../static/img/invoice_3@2x.png");
	}
	.menu-item .icon.special{
		background-image:url("../../../static/img/special_3@2x.png");
	}
	.menu-item .text{
		display: table-cell;
		width: 56px;
		vertical-align: middle;
		font-size: 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		text-align: center;
	}
	.goods .foods-warpper{
		flex: 1;
	}
	.foods-warpper .title{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(147,153,159);
		background-color:#f3f5f7;
	}
	.foods-warpper .food-item{
		display: flex;
		margin: 18px;
		padding-bottom: 18px;
		border-bottom: rgba(7,17,27,0.1);
		position: relative;
	}
	.foods-warpper .food-item:last-child{
		border-bottom: 0;
	}
	.foods-warpper .icon{
		flex: 0 0 57px;
		margin-right: 10px;	
	}
	.foods-warpper .icon img{
		display: inline-block;
		width: 57px;
		height: 57px;
	}
	.foods-warpper .content{
		flex: 1;
	}
	.foods-warpper .name{
		margin: 2px 0 8px 0;
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.foods-warpper .desc{
		margin-bottom: 8px;
		line-height: 10px;
	}
	.foods-warpper .desc , .foods-warpper .extra{
		line-height: 16px;
        font-size: 10px;
        color: rgb(147, 153, 159);
	}
	.foods-warpper .extra .count{
        margin-right: 12px;
	}
	.foods-warpper .price{
		 font-weight: 700;
         line-height: 24px;
	}
	.foods-warpper .price .now{
		 margin-right: 8px;
         font-size: 14px;
         color: rgb(240, 20, 20);
	}
	.foods-warpper .price .old{
		 text-decoration: line-through;
         font-size: 10px;
         color: rgb(147, 153, 159);
	}
	.foods-warpper .cartcontrol-wrapper{
		position: absolute;
		right: 0;
		bottom: 12px;
	}
</style>