<template>
  <div class="container">
      <el-row type="flex" justify="space-between">
          <!-- 顶部过滤列表 -->
          <div class="flights-content">
              <!-- 过滤条件 -->
                <FlightsFilters :data="cacheFlightsData" @getList="getList"/>
              <!-- 航班头部布局 -->
                <FlightsListHead></FlightsListHead>
              <!-- 航班列表 -->
                <FlightsItem v-for="(item,index) in dataList" :key="index" :data='item'></FlightsItem>
                <!-- 分页 -->
                <!-- size-change: 切换条数时候触发的事件
                current-change: 切换页面时候触发的事件
                current-page: 当前的页数
                page-size: 当前的条数
                total: 总条数 -->
                <el-row type="flex" justify="center" style="margin-top:10px;">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </el-row>
          </div>
          <!-- 侧边栏历史记录 -->
              <div class="aside">
                <FlightsAside></FlightsAside>
              </div>
      </el-row>
  </div>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
import FlightsFilters from '@/components/air/flightsFilters'
import FlightsAside from '@/components/air/flightsAside'
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
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },
    methods:{
        // 获取航班总数据
        getData(){
            this.$axios({
                url:'/airs',
                params:this.$route.query
            }).then(res=>{
                // console.log(res)
                this.flightsData=res.data
                // 备份数据, res.data需要拷贝出来
                this.cacheFlightsData={...res.data}
                this.total=this.flightsData.total
            })
        },
        handleSizeChange(index){
            this.pageSize = index;
        },
        handleCurrentChange(index){
            this.pageIndex = index;
        },
        // 获取过滤组件的过滤后的数组(arr就是过滤后的数组)
        getList(arr){
            this.flightsData.flights = arr;
            // 总条数
            this.total = arr.length;
        }
    },
    beforeRouteUpdate(to,from,next){
        // 每次URL变化时把当前页数改为1
        this.pageIndex=1;
        // 跳转
        next();//next提前，避免url参数和页面渲染不一致
        // 请求机票列表数据
        this.getData()
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