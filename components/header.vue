<template>
  <div class="header">
    <!-- ElementUI的Layout布局 -->
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt="logo" />
        </nuxt-link>
      </div>
      <!-- 菜单栏 -->
      <el-row type="flex" align="middle" class="navs">
        <nuxt-link
          v-for="(item,index) in navs"
          :key="index"
          :to="item.jump"
          :class="{active:current==index}"
          @click="handleClick(index)"
        >{{item.name}}</nuxt-link>
        <!-- <nuxt-link to="/">首页</nuxt-link> -->
        <!-- <nuxt-link to="/post">旅游攻略</nuxt-link>
             <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>-->
      </el-row>
      <!-- 登录/用户 -->
      <!-- <el-dropdown v-if="false">
        <el-row type="flex" align="middle" class="el-dropdown-link">
          <nuxt-link to="#">
            <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" />
            用户名
          </nuxt-link>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-row>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <nuxt-link to="#">个人中心</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="handleLogout">退出</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->

      <el-row type="flex" align="middle">
        <nuxt-link to="/user/login" class="account-link">登录 / 注册</nuxt-link>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      navs: [
        {
          jump: "/",
          name: "首页"
        },
        {
          jump: "/post",
          name: "旅游攻略"
        },
        {
          jump: "/hotel",
          name: "酒店"
        },
        {
          jump: "/air",
          name: "国内机票"
        }
      ]
    };
  },
  methods: {
    handleClick(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    .logo {
      width: 156px;
      padding-top: 8px;
      img {
        width: 100%;
        // display: block;
      }
    }
    .navs {
      margin: 0 20px;
      flex: 1;
      a {
        padding: 0 20px;
        &:hover {
          color: #409eff;
          border-bottom: 5px solid #409eff;
        }
      }
      .nuxt-link-exact-active{
            background: #409eff;
            color: #fff;
            &:hover{
                color: #fff;
            }
        }
    }
    .account-link {
      font-size: 14px;
      color: #666;
      margin-left: 10px;
      &:hover {
        color: #409eff;
        text-decoration: underline;
      }
    }
  }
}
</style>