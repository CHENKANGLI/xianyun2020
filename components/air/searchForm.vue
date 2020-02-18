<template>
  <div class="search-form">

    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in tabs"
        :key="index"
        @click="handleSearchTab(item,index)"
        :class="{active:index===currentTab}"
      >
        <i :class="item.icon">{{item.name}}</i>
      </span>
    </el-row>
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions: 监听输入框的输入，可以在这个事件中请求API数据,类似input事件 -->
        <!-- select: 点击展开列表选项时候触发 -->
        <!-- @blur：失去焦点时候触发，默认选中第一个 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          v-model="form.departDate"
          placeholder="请选择日期"
          :picker-options="pickerOptions"
          style="width: 100%;"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>

      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ''
      },
      // 设置禁用状态，参数为当前日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 24 * 60 * 60 * 1000 < Date.now();
        }
      },
      // 出发城市列表
      departData:[],
      // 到达城市列表
      destData:[]
    };
  },
  methods: {
    // 封装获取出发城市和到达城市的请求函数
    querySearch(value){
      return this.$axios({
        url:'/airs/city',
        params:{
          name:value
        }
      }).then(res=>{
        const {data} =res.data;
        // data是数组，但是数组中的对象没有value值
        // 给data中每一项都添加一个value属性 (可用forEach,map)
        const newData=data.map(v=>{
          v.value=v.name.replace('市','');
          return v
        })
        return newData
      })
    },
    // 点击tab时触发
    handleSearchTab(item, index) {
      if(index===1){
        this.$alert('抱歉，目前暂不支持往返选票！','提示',{
          confirmButtonText:'确定',
          type:'warning'
        })
      }
    },
    // 监听出发城市输入框的输入
    queryDepartSearch(value, callback) {
      if(!value){
        // 如果value是空的，把原来的城市列表清空
         this.departData=[];
         // 调用callback传入空数组，不会出现空白的加载中的下拉面板
         callback([]);
         return;
      }
      this.querySearch(value).then(newData=>{
         this.departData=newData;
         callback(newData)
      })
    },
    handleDepartSelect(item) {
      // console.log(item)
      this.form.departCity=item.value;
      this.form.departCode=item.sort
    },
    // 监听到达城市输入框的输入
    queryDestSearch(value, callback) {
      if(!value){
         this.destData=[];
         callback([]);
         return;
      }
      this.querySearch(value).then(newData=>{
         this.destData=newData;
         callback(newData)
      })
    },
    handleDestSelect(item) {
      // console.log(item)
      this.form.destCity=item.value;
      this.form.destCode=item.sort
    },
    handleDate(value) {
      // console.log(value)// 打印结果 Tue Feb 18 2020 00:00:00 GMT+0800 (中国标准时间)
      this.form.departDate=moment(value).format('YYYY-MM-DD')
      // console.log(this.form)
    },
    // 提交表单
    handleSubmit() {
      // 非空判断
      if(!this.form.departCity){
        this.$message.error('请输入出发城市')
        return
      }
      if(!this.form.destCity){
        this.$message.error('请输入到达城市')
        return
      }
      if(!this.form.departDate){
        this.$message.error('请选择时间')
        return
      }
      // 表单数据存储到仓库
      this.$store.commit('air/setHistory',this.form)
      // 跳转到/air/flights，保证该页面url的参数有表单内的5个参数
      this.$router.push({
        path:'/air/flights',
        query:this.form
      })
    },
    // 出发城市和到达城市互换
    handleReverse() {
      // 获取表单数据并存储，再赋值
      const {departCity,departCode,destCity,destCode} = this.form
      this.form.departCity=destCity
      this.form.departCode=destCode
      this.form.destCity=departCity
      this.form.destCode=departCode
    }
  }
};
</script>

<style lang='less' scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>