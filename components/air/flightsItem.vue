<template>
  <div class="flight-item">
      <!-- 点击切换isShow的Boolean值 -->
     <div @click="isShow=!isShow">
          <!-- 显示机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
          <el-col :span="6">
              <span>{{data.airline_name}}</span>{{data.flight_no}}
          </el-col>
          <el-col :span="12">
              <el-row type="flex" justify="space-between" class="flight-info-center">
                    <el-col :span='8' class="flight-airport">
                        <strong>{{data.dep_time}}</strong>
                        <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
                    </el-col>
                    <el-col :span='8' class="flight-time">
                        <strong>{{rankTime}}</strong>
                    </el-col>
                    <el-col :span='8' class="flight-airport">
                        <strong>{{data.arr_time}}</strong>
                        <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
                    </el-col>
              </el-row>
          </el-col>
          <el-col :span="6" class="flight-info-right">
                ￥<span class="sell-price">{{ data.base_price / 2}}</span>起
          </el-col>
      </el-row>
     </div>
    <div class="flight-recommend" v-if="isShow">
        <!-- 隐藏的座位信息列表 -->
        <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell" v-for="(item,index) in data.seat_infos" :key="index">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{item.name}}</span> | {{item.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{item.settle_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            type="warning" 
                            size="mini"
                            @click="handleToOrder(item)">
                            选定
                            </el-button>
                            <p>剩余：{{item.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            isShow:false//默认隐藏
        }
    },
    props:{
        data:{
            // 声明data属性的类型
            type:Object,
            // 如果组件调用时候不传data，采用默认值
            default:{}
        }
    },
    computed:{
        rankTime(){
            const end=this.data.arr_time.split(':')
            const start=this.data.dep_time.split(':')
            // 将时间转换为分钟
            let endMin=end[0]*60+Number(end[1])
            let startMin=start[0]*60+Number(start[1])
            // 跨天（红眼航班）
            if(endMin<startMin){
                endMin+=24*60
            }
            // 相隔分钟
            const dis=endMin-startMin
            const hours=Math.floor(dis/60)
            const min = dis%60
            return `${hours}小时${min}分`
        }
    },
    methods:{
        handleToOrder(item){
            this.$router.push({
                path:'/air/order',
                query:{
                    id:this.data.id,//航班id
                    seat_xid:item.seat_xid//座位id
                }
            })
        }
    }
};
</script>

<style lang='less' scoped>
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>