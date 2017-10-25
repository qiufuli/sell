<template>
  <div id="app">
			<v-header :seller="seller"></v-header>
		<div class="tab">
			<div class="tab-item">
				<router-link to="/">商品</router-link>
			</div>
			<div class="tab-item">
			<router-link to="/ratings">评论</router-link>
			</div>
			<div class="tab-item">
			<router-link to="/seller">商家</router-link>
			</div>
		</div>
		<router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import vHeader from "@/components/header/header.vue"
export default {
  name: 'app',
  data(){
  	return{
  		seller:{}
  		
  	}
  },
  created() {
  	this.$http.get('../static/data.json').then((response)=>{

  		response = response.body;
  		this.seller = response.seller
  		console.log(this.seller)
  	})
  },
  components:{
  	vHeader,
  	
  }
}
</script>

<style>
.tab{
	display: flex;
	width: 100%;
	height: 40px;
	line-height: 40px;
	border-bottom:1px solid rgba(7,17,27,0.1);
}
.tab .tab-item{
	flex:1;
	text-align: center;
}
.tab-item a{ 
	display: block;
	color: rgb(77,85,93);
	font-size: 14px;
}
.tab-item a.router-link-exact-active{
	color: rgb(240,20,20);
}
</style>

