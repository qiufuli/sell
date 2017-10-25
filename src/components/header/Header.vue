<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" alt="" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="supports">
					<span class="icon" :class="classmap[seller.supports[0].type]">
						
					</span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
				
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img width="100%" height="100%" :src="seller.avatar" alt="" />
		</div>
		<div class="detail" v-show="detailShow" transition="fade">
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<!--优惠信息-->
					<div class="title2">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<!-- 优惠list-->
					<div v-if="seller.supports" class="supports2">
						<li class="support-item" v-for="(item,index) in seller.supports" >
							<span class="icon" :class="classmap[seller.supports[index].type]"></span>
							<span class="text">{{seller.supports[index].description}}</span>
						</li>
					</div>
					<!--商家公告-->
					<div class="title2">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">{{seller.bulletin }}</p>
					</div>
				</div>
			</div>
			<div class="datail-close" @click="hideDetail">
				<i class="icon-close">x</i>
			</div>
		</div>
	</div>
</template>

<script>
	import star from "@/components/star/star"
	export default{
		props:['seller'],
		created(){
			this.classmap = ['decrease','discount','guarantee','invoice','special'];
		},
		components:{
			star
		},
		data(){
			return{
				detailShow:false
			}
		},
		methods:{
			showDetail(){
				this.detailShow=true
			},
			hideDetail(){
				this.detailShow = false
			}
		}
	}
</script>

<style>
	.header{
		color: #fff;
		position: relative;
		background: rgba(7,17,27,0.5);
		overflow: hidden;
	}
	.content-wrapper{
		padding: 24px 12px 18px 24px;	
		font-size: 0;
		position: relative;
	}
	.content-wrapper .avatar , .content-wrapper .content{
		display: inline-block;
	}
	.content-wrapper .avatar{
		vertical-align: top;
	}
	.content-wrapper .avatar img{
		border-radius: 2px;
	}
	.content-wrapper .content{
		font-size: 14px;
		margin-left: 16px;
	}
	.content .title{
		margin: 2px 0 8px 0;
	}
	.title .brand{
		display: inline-block;
		width: 30px;
		height: 18px;
		background:url("img/brand@2x.png") no-repeat;
		background-size: 30px 18px;
		vertical-align: top;
	}
	.title .name{
		margin-left: 6px;
		font-size: 16px;
		line-height: 18px;
		font-weight: bold;
	}
	.content .description{
		margin-bottom: 10px;
		line-height: 12px;
		font-size: 12px;
	}
	.content .supports{
		
	}
	.content .supports .icon{
		display: inline-block;	
		width: 12px;
		height: 12px;
		margin-right: 4px;
		background-size: 12px 12px;
		background-repeat: no-repeat;
		/*vertical-align: middle;*/
	}
	.content .supports .icon.decrease{
		background-image:url("img/decrease_1@2x.png");
	}
	.content .supports .icon.discount{
		background-image:url("img/discount_1@2x.png");
	}
	.content .supports .icon.guarantee{
		background-image:url("img/guarantee_1@2x.png");
	}
	.content .supports .icon.invoice{
		background-image:url("img/invoice_1@2x.png");
	}
	.content .supports .icon.special{
		background-image:url("img/special_1@2x.png");
	}
	.content .supports .text{
		line-height: 12px;
		font-size: 12px;
	}
	.support-count{
		position: absolute;
		right: 12px;
		bottom: 18px;
		padding: 0 8px;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background:rgba(0,0,0,0.2);
		text-align: center;
	}
	.support-count .count{
		font-size: 10px;
	}
	.support-count .icon-keyboard_arrow_right{
		font-size: 10px;
		line-height: 24px;
		margin-left: 2px;
	}
	.bulletin-wrapper{
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		/*font-size: 0;*/
		position: relative;
		background: rgba(7,17,27,0.2);
	}
	.bulletin-title{
		display: inline-block;
		width: 22px;
		height: 12px;
		background: url("img/bulletin@2x.png") no-repeat;
		background-size: 22px 12px;
		vertical-align: top;
		margin-top: 8px;
	}
	.bulletin-text{
		font-weight: 200px;
		font-size: 10px;
		margin: 0 4px;
		vertical-align: top;
	}
	.bulletin-wrapper .icon-keyboard_arrow_right{
		font-size: 10px;
		position: absolute;
		right: 12px;
		bottom: 8px;
	}
	.background{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(10px);
	}
	.detail{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(7,17,27,0.8);
		overflow: auto;
		z-index: 100;
		transition: all .5s;
		backdrop-filter:blur(10px);
	}
	.fade-transition{
		opacity: 1;
		background: rgba(7,17,27,0.8);
	}
	.fade-enter,.fade-leave{
		opacity: 0;
		background: rgba(7,17,27,0);
	}
	.detail-wrapper{
		width: 100%;
		min-height: 100%;
	}
	.detail-main{
		margin-top: 64px;
		padding-bottom:64px;
		
	}
	.datail-close{
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto;
		clear: both;
		font-size: 32px;
		color: #ffff;
		text-align: center;
	}
	.icon-close{
		font-style: normal;
	}
	.detail-main .name{
		line-height: 16px;
		text-align: center;
		font-size: 16px;
		font-weight: 700;
	}
	.star-wrapper{
		margin-top: 18px;
		padding: 2px 0;
		text-align: center;
	}
	.title2{
		display: flex;
		width: 80%;
		margin: 28px auto 24px auto;
	}
	.title2 .line{
		flex: 1;
		position: relative;
		top: -6px;
		border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	.title .text{
		padding: 0 12px;
		font-size: 14px;
		font-weight: 700;
	}
	.supports2{
		width: 80%;
		margin: 0 auto;
	}
	.support-item{
		padding: 0 12px;
		margin-bottom: 12px;
		font-size: 0;
	}
	.support-item:last-child{
		margin-bottom: 0;
	}
	.support-item .icon{
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		margin-right: 6px;
		background-size: 16px 16px;
		background-repeat: no-repeat;
	}
	.support-item .text{
		line-height: 16px;
		font-size: 12px;
	}
	.support-item .icon.decrease{
		background-image:url("img/decrease_2@2x.png");
	}
	.support-item .icon.discount{
		background-image:url("img/discount_2@2x.png");
	}
	.support-item  .icon.guarantee{
		background-image:url("img/guarantee_2@2x.png");
	}
	.support-item  .icon.invoice{
		background-image:url("img/invoice_2@2x.png");
	}
	.support-item  .icon.special{
		background-image:url("img/special_2@2x.png");
	}
	.bulletin{
		width: 80%;
		margin: 0 auto;
	}
	.bulletin .content{
		padding: 0 12px;
		line-height: 24px;
		font-size: 12px;
	}

</style>