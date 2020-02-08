<template>
  <div class="container">
    <!-- 背景轮播图 -->
      <el-carousel :interval="3000" arrow="always">
         <el-carousel-item v-for="(item,index) in banners" :key="index">
           <div class="banner-image"
                :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;
                background-size:contain contain;`">
           </div>
         </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners:[]
    }
  },
  methods:{

  },
  mounted(){
    this.$axios({
      url:'/scenics/banners'
    }).then(res=>{
      console.log(res);
      // 解构赋值
       const {data}=res.data;
       this.banners=data;
    })
  }
}
</script>

<style lang='less' scoped>
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }
}
</style>