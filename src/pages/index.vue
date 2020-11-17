<template>
  <div>
    <el-container>
      <el-header
        >气死了么后台管理系统
        <div v-if="getUserInfo" class="userInfo">
          <h2>欢迎 {{ getUserInfo.username }} 登录本系统</h2>
          <el-button @click="logout" type="danger" size="small">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 引入导航菜单 -->
          <t-nav></t-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import tNav from "../components/nav";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    tNav,
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    logout() {
      this.changeUserInfoAction(null);
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-header
  background #00BFFF
  font 35px / 60px '宋体'
  color #fff
  text-indent 2rem
  .userInfo
    float right
    h2
      font 25px/25px "微软雅黑"
      display inline-block
</style>
