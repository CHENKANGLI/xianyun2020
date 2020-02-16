<template>
  <div class="container">
      <el-row type="flex" justify="space-between">
          <!-- 顶部过滤列表 -->
          <div class="flights-content">
              <!-- 过滤条件 -->
              <!-- 航班头部布局 -->
                <FlightsListHead></FlightsListHead>
              <!-- 航班列表 -->
                <FlightsItem v-for="(item,index) in dataList" :key="index" :data='item'></FlightsItem>
              <!-- 侧边栏历史记录 -->
              <div class="aside">

              </div>
          </div>
      </el-row>
  </div>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
export default {
    data () {
        return {
            // 航班总数据
            flightsData:{
                info:{},
                flights:[],
                options:{}
            },
            // 航班列表数据，用来存储分页后显示的数据
            cacheFlightsData:{
                info:{},
                flights:[],
                options:{}
            },
            // 当前页码
            pageIndex:1,
            // 每页条数
            pageSize:5,
            // 总条数
            total:0
        }
    },
    computed:{
        dataList(){
            if(!this.flightsData.flights){
                return [];
            }
            const arr=this.flightsData.flights.slice(
                (this.pageIndex-1)*this.pageSize,//start
                this.pageIndex*this.pageSize//end
            )
            return arr
        }
    },
    components:{
        FlightsListHead,FlightsItem
    },
    methods:{
        // 获取航班总数据
        getData(){
            this.$axios({
                url:'/airs',
                params:this.$route.query
            }).then(res=>{
                console.log(res)
                this.flightsData=res.data
                this.cacheFlightsData={...res.data}
                this.total=this.flightsData.total
            })
        }
    },
    mounted(){
        this.getData()
    }
}
</script>

<style lang='less' scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>