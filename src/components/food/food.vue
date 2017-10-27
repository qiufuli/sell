<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image">
					<div class="back" @click="hide">
						<i class="iconfont icon-return"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="foodDetail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<div class="buy" @click.stop.prevent="addFirst" v-show="!food.count ||food.count === 0">加入购物车</div>
				</div>
				<split v-show="food.info"></split>
				<!--展示商品信息-->
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li class="rating-item" v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"  >
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avatar" width="12" height="12" :src="rating.avatar" alt="" />
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span class="iconfont ":class="{'icon-zan-up':rating.rateType===0,'icon-zan-down':rating.rateType===1}">
										{{rating.text}}
									</span>
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">
							暂无评价
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import cartcontrol from '@/components/cartcontrol/cartcontrol';
	import split from '@/components/split/split';
	import { formatDate } from '@/common/js/date';
	import ratingselect from '@/components/ratingselect/ratingselect';
	import {sellEmit} from '@/common/js/sellEmit'
	const ALL = 2;
	export default {
		props: ["food"],
		data() {
			return {
				showFlag: false,
				//评论类型
				selectType: ALL,
				//只显示有内容的
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		},
		created(){
			sellEmit.$on("ratingtype.select",(data)=>{
				this.selectType = data;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			})
			sellEmit.$on("content.toggle",(data)=>{
				this.onlyContent = data;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			})
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						})
					} else {
						this.scroll.refresh();
					}
				});
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(event) {
				if(!event._constructed) {
					return;
				}
				Vue.set(this.food, 'count', 1);
			},
			// 这个写的挺好
			needShow(type, text) {
				if(this.onlyContent && !text) {
					return false;
				}
				if(this.selectType === ALL) {
					return true;
				} else {
					// 如果v-for中的type和返回的值是一样的就显示对应type的数据
					return type === this.selectType;
				}
			}
		},
//		events: {
//			'ratingtype.select' (type) {
//				this.selectType = type;
//				this.$nextTick(() => {
//					this.scroll.refresh();
//				});
//			},
//			'content.toggle' (onlyContent) {
//				this.onlyContent = onlyContent;
//				this.$nextTick(() => {
//					this.scroll.refresh();
//				});
//			}
//		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		}
	}
</script>

<style>
	.food {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background: #fff;
		transition: all 0.4s ease;
	}
	
	.food.move-enter-active,
	.food.move-leave-active {
		transform: translate3d(0, 0, 0);
	}
	
	.food.move-enter,
	.food.move-leave-active {
		transform: translate3d(100%, 0, 0)
	}
	
	.food .image-header {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	
	.food .image-header img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.food .image-header .back {
		position: absolute;
		top: 10px;
		left: 5px;
		background:rgba(7,17,27,0.3);
		border-radius: 50%;
	}
	
	.food .image-header .back .icon-return {
		display: block;
		padding: 5px;
		font-size: 20px;
		color: #fff;
		
	}
	
	.food .content {
		position: relative;
		padding: 18px;
	}
	
	.food .content .title {
		line-height: 14px;
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7, 17, 27);
	}
	
	.food .content .foodDetail {
		margin-bottom: 18px;
		line-height: 10px;
		height: 10px;
		font-size: 0;
	}
	
	.food .content .foodDetail .sell-count,
	.food .content .foodDetail .rating {
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	
	.food .content .foodDetail .sell-count {
		margin-right: 12px;
	}
	
	.food .content .price {
		font-weight: 700;
		line-height: 24px;
	}
	
	.food .content .price .now {
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240, 20, 20);
	}
	
	.food .content .price .old {
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	
	.food .content .cartcontrol-wrapper {
		position: absolute;
		right: 12px;
		bottom: 12px;
	}
	
	.food .content .buy {
		position: absolute;
		right: 18px;
		bottom: 18px;
		z-index: 10;
		height: 24px;
		line-height: 24px;
		padding: 0 12px;
		box-sizing: border-box;
		border-radius: 12px;
		font-size: 10px;
		color: #fff;
		background: rgb(0, 160, 220);
		transition: all 0.2s;
	}
	
	.food .content .buy.fade-enter-active,
	.food .content .buy.fade-leave-active {
		opacity: 1;
	}
	
	.food .content .buy.fade-enter,
	.food .content .buy.fade-leave-active {
		opacity: 0;
	}
	/*商品信息*/
	
	.food .info {
		padding: 18px;
	}
	
	.food .info .title {
		line-height: 14px;
		margin-bottom: 6px;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	
	.food .info .text {
		line-height: 24px;
		padding: 0 8px;
		font-size: 12px;
		color: rgb(77, 85, 93);
	}
	
	.food .rating {
		padding-top: 18px;
	}
	
	.food .rating .title {
		line-height: 14px;
		margin-left: 18px;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	
	.food .rating .rating-wrapper {
		padding: 0 18px;
	}
	
	.food .rating .rating-wrapper .rating-item {
		position: relative;
		padding: 16px 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.food .rating-item .user {
		position: absolute;
		right: 0;
		top: 16px;
		line-height: 12px;
		font-size: 0;
	}
	
	.food .rating-item .user .name {
		display: inline-block;
		margin-right: 6px;
		vertical-align: top;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	
	.food .rating-item .user .avatar {
		border-radius: 50%
	}
	
	.food .rating-item .time {
		margin-bottom: 6px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	
	.food .rating-item .text {
		line-height: 16px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	
	.food .rating-item .text .icon-zan-up,
	.food .rating-item .text .icon-zan-down {
		margin-right: 4px;
		line-height: 16px;
		font-size: 12px;
	}
	
	.food .rating-item .text .icon-zan-up {
		color: rgb(0, 160, 220);
	}
	
	.food .rating-item .text .icon-zan-down{
		color: rgb(147, 153, 159)
	}
	
	.food .no-rating {
		padding: 16px 0;
		font-size: 12px;
		color: rgb(147, 153, 159);
	}
</style>