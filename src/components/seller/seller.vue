<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<!--收藏-->
				<div class="favorite" @click="toggleFavorite">
					<span class="iconfont icon-favorite" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90" alt="" />
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title ">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import split from '@/components/split/split';
	import star from '@/components/star/star';

	export default {
		props: ["seller"],
		components: {
			split,
			star
		},
		created() {

			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		watch: {
			//如果你实现了滚动但切换的时候能滚动 不切换滚动不了
			// 因为异步加载的seller scroll加载上  监听其变化 在此处加上事件
			// 在mounted中也要加上 
			seller() {
				this._initScroll();
				this._initPics();
			}
		},
		mounted() {
			this._initScroll();
			this._initPics();

		},
		data() {
			return {
				favorite: false
			}
		},
		computed:{
			favoriteText(){
				return this.favorite? '已收藏' : '收藏';
			}
		},
		methods: {
			_initScroll() {
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.seller, {
							click: true
						})
					} else {
						this.scroll.refresh();
					}
				});
			},
			_initPics() {
				if(this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$refs.picList.style.width = width + "px";
					this.$nextTick(() => {
						if(!this.picScroll) {
							this.picScroll = new BScroll(this.$refs.picWrapper, {
								//横向滚动
								scrollX: true,
								//正常的滚动之间相互不影响
								eventPassthrough: 'vertical'
							});
						} else {
							this.picScroll.refresh();
						}
					});
				}
			},
			toggleFavorite(event){
				if(!event._constructed){
					return;
				}
				this.favorite = !this.favorite;
			}
		}
	}
</script>

<style>
	.seller {
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.seller .seller-content .overview {
		position: relative;
		padding: 18px;
	}
	
	.seller-content .overview .title {
		margin-bottom: 8px;
		line-height: 14px;
		color: rgb(7, 17, 27);
		font-size: 14px;
	}
	
	.seller-content .overview .desc {
		padding-bottom: 18px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		font-size: 0;
	}
	
	.seller-content .overview .star {
		display: inline-block;
		margin-right: 8px;
		vertical-align: top;
	}
	
	.seller-content .overview .text {
		display: inline-block;
		margin-right: 12px;
		line-height: 18px;
		vertical-align: top;
		font-size: 10px;
		color: rgb(77, 85, 93);
	}
	/*remark*/
	
	.remark {
		display: flex;
		padding-top: 18px;
	}
	
	.remark .block {
		flex: 1;
		text-align: center;
		border-right: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.remark .block:last-child {
		border: none;
	}
	
	.remark .block h2 {
		margin-bottom: 4px;
		line-height: 10px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	
	.remark .block .content {
		line-height: 24px;
		font-size: 10px;
		color: rgb(7, 17, 27);
	}
	
	.remark .block .content .stress {
		font-size: 24px;
	}
	/*favorite*/
	
	.favorite {
		position: absolute;
		width: 50px;
		right: 11px;
		top: 18px;
		text-align: center;
	}
	
	.favorite .icon-favorite {
		display: block;
		margin-bottom: 4px;
		line-height: 24px;
		font-size: 24px;
		color: #d4d6d9;
	}
	
	.favorite .icon-favorite.active {
		color: rgb(240, 20, 20);
	}
	
	.favorite .text {
		line-height: 10px !important;
		font-size: 10px;
		color: rgb(77, 85, 93);
		margin: 0 !important;
		
	}
	/*bulletin*/
	
	.bulletin {
		padding: 18px 18px 0 18px;
	}
	
	.bulletin .title {
		margin-bottom: 8px;
		line-height: 14px;
		color: rgb(7, 17, 27);
		font-size: 14px;
	}
	
	.bulletin .content-wrapper {
		padding: 0 12px 16px 12px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.bulletin .content-wrapper .content {
		line-height: 24px;
		font-size: 12px;
		color: rgb(240, 20, 20);
		padding: 0;
		margin: 0;
	}
	
	.bulletin .support-item {
		padding: 16px 12px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		font-size: 0;
	}
	
	.bulletin .support-item:last-child {
		border: none;
	}
	
	.bulletin .support-item .icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		margin-right: 6px;
		background-size: 16px 16px;
		background-repeat: no-repeat;
	}
	
	.bulletin .support-item .icon.decrease {
		background-image: url('../../../static/img/decrease_4@2x.png');
	}
	
	.bulletin .support-item .icon.discount {
		background-image: url('../../../static/img/discount_4@2x.png');
	}
	
	.bulletin .support-item .icon.guarantee {
		background-image: url('../../../static/img/guarantee_4@2x.png');
	}
	
	.bulletin .support-item .icon.invoice {
		background-image: url('../../../static/img/invoice_4@2x.png');
	}
	
	.bulletin .support-item .icon.special {
		background-image: url('../../../static/img/special_4@2x.png');
	}
	
	.bulletin .support-item .text {
		line-height: 16px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	/*pics*/
	
	.pics {
		padding: 18px;
	}
	
	.pics .title {
		margin-bottom: 12px;
		line-height: 14px;
		color: rgb(7, 17, 27);
		font-size: 14px;
	}
	
	.pics .pic-wrapper {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.pics .pic-wrapper .pic-list {
		font-size: 0;
	}
	
	.pic-wrapper .pic-list .pic-item {
		display: inline-block;
		margin-right: 6px;
		width: 120px;
		height: 90px;
	}
	
	.pic-wrapper .pic-list .pic-item:last-child {
		margin: 0;
	}
	/*info*/
	
	.info {
		padding: 18px 18px 0 18px;
		color: rgb(7, 17, 27);
	}
	
	.info .title {
		padding-bottom: 12px;
		line-height: 14px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		font-size: 14px;
	}
	
	.info .info-item {
		padding: 16px 12px;
		line-height: 16px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		font-size: 12px;
	}
	
	.info .info-item:last-child {
		border: none;
	}
</style>