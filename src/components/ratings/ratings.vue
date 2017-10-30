<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">
						高于周边商家{{seller.rankRate}}%
					</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar" alt="" />
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">
										{{rating.deliveryTime}}分钟送达
									</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend.length && rating.recommend">
								<span class="iconfont icon-zan-up"></span>
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import star from '@/components/star/star';
	import ratingselect from '@/components/ratingselect/ratingselect';
	import split from '@/components/split/split';
	import { formatDate } from '@/common/js/date';
	import { sellEmit } from '@/common/js/sellEmit'
	const ALL = 2;
	export default {
		props: ["seller"],
		components: {
			star,
			split,
			ratingselect
		},
		data() {
			return {
				showFlag: false,
				//评论类型
				selectType: ALL,
				//只显示有内容的
				onlyContent: true,
				ratings: []
			}
		},
		created() {
			this.$http.get('../static/data.json').then((response) => {
				response = response.body;
				this.ratings = response.ratings;
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.ratings, {
							click: true
						})
					} else {
						this.scroll.refresh();
					}
				});
			});
			//监听事件的数据变化
			sellEmit.$on("ratingtype.select", (data) => {
				this.selectType = data;
				this.$nextTick(() => {
					//如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常
					this.scroll.refresh();
				});
			})
			sellEmit.$on("content.toggle", (data) => {
				this.onlyContent = data;
				this.$nextTick(() => {
					//如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常
					this.scroll.refresh();
				});
			})

		},
		mounted() {
			
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		methods:{
			// 这个写的挺好
			needShow(type, text) {
				// 只有内容 并且没有文本的时候
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
		}
	}
</script>

<style >
	.ratings {
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.ratings-content .overview {
		display: flex;
		padding: 18px 0;
	}
	
	.overview .overview-left {
		flex: 0 0 137px;
		width: 137px;
		border-right: 1px solid rgba(7, 17, 27, 0.1);
		text-align: center;
		padding: 6px 0;
	}
	
	@media all screen and (max-width:320px) {
		.overview .overview-left {
			flex: 0 0 120px;
			width: 120px;
		}
	}
	
	.overview-left .score {
		font-size: 24px;
		line-height: 28px;
		color: rgb(255, 153, 0);
		margin-bottom: 6px;
	}
	
	.overview-left .title {
		line-height: 12px;
		font-size: 12px;
		color: rgb(7, 17, 27);
		margin-bottom: 8px;
	}
	
	.overview-left .rank {
		line-height: 10px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	
	.overview .overview-right {
		flex: 1;
		padding: 6px 0 6px 24px;
	}
	
	@media all screen and (max-width:320px) {
		.overview .overview-right {
			padding-left: 6px;
		}
	}
	
	.overview-right .score-wrapper {
		margin-bottom: 8px;
		font-size: 0;
	}
	
	.score-wrapper .title {
		font-size: 12px;
		color: rgb(7, 17, 27);
		display: inline-block;
		vertical-align: top;
		line-height: 18px;
	}
	
	.score-wrapper .star {
		display: inline-block;
		vertical-align: top;
		margin: 0 12px;
	}
	
	.score-wrapper .score {
		display: inline-block;
		line-height: 18px;
		vertical-align: top;
		font-size: 12px;
		color: rgb(255, 153, 0);
	}
	
	.delivery-wrapper {
		font-size: 0;
	}
	
	.delivery-wrapper .title {
		font-size: 12px;
		color: rgb(7, 17, 27);
		line-height: 18px;
	}
	
	.delivery-wrapper .delivery {
		font-size: 12px;
		color: rgb(147, 153, 159);
		margin-left: 12px;
	}
	
	.rating-wrapper {
		padding: 0 18px;
	}
	
	.rating-wrapper .rating-item {
		display: flex;
		padding: 18px 0;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.rating-wrapper .rating-item .avatar {
		flex: 0 0 28px;
		width: 28px;
		margin-right: 12px;
	}
	
	.rating-wrapper .rating-item .avatar img {
		border-radius: 50%;
	}
	
	.rating-wrapper .rating-item .content {
		flex: 1;
		position: relative;
	}
	
	.rating-wrapper .rating-item .content .name {
		line-height: 12px;
		font-size: 10px;
		color: rgb(7, 17, 27);
		margin-bottom: 4px;
	}
	
	.rating-wrapper .rating-item .content .star-wrapper {
		margin-bottom: 6px;
		text-align: left;
		font-size: 0;
	}
	
	.rating-wrapper .rating-item .content .star-wrapper .star {
		display: inline-block;
		vertical-align: top;
		margin-right: 16px;
	}
	
	.rating-wrapper .rating-item .content .star-wrapper .delivery {
		display: inline-block;
		vertical-align: top;
		font-size: 10px;
		color: rgb(147, 153, 159);
		line-height: 12px;
	}
	
	.rating-wrapper .rating-item .content .text {
		font-size: 12px;
		line-height: 18px;
		color: rgb(7, 17, 27);
		margin-bottom: 8px;
	}
	
	.rating-wrapper .rating-item .content .recommend {
		line-height: 16px;
		font-size: 0;
	}
	
	.rating-wrapper .rating-item .content .recommend .icon-zan-up,
	.rating-wrapper .rating-item .content .recommend .item {
		display: inline-block;
		margin: 0 8px 4px 0;
		font-size: 9px;
	}
	
	.rating-wrapper .rating-item .content .recommend .icon-zan-up {
		color: rgb(0, 160, 220);
	}
	
	.rating-wrapper .rating-item .content .recommend .item {
		padding: 0 6px;
		border: 1px solid rgba(7, 17, 27, 0.1);
		border-radius: 1px;
		color: rgb(147, 153, 159);
		background: #fff;
	}
	
	.rating-wrapper .rating-item .content .time {
		position: absolute;
		top: 0;
		right: 0;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
</style>