<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="lightblue"
      text-color="#fff"
      active-text-color="#FE642E"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-grid"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu
        :index="item.id.toString()"
        v-for="item in getUserInfo.menus"
        :key="item.id"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          :index="menu.url"
          v-for="menu in item.children"
          :key="menu.id"
        >
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    data() {
        return {
          defaultActive:'/home'
        };
    },
    mounted() {
      //组件一加载就会触发挂载
      this.defaultActive = this.$route.path

    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
  
};
</script>

<style lang="" scoped>
</style>
