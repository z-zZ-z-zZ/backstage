<template>
  <div>
    <el-table
      :data="menuList"
      style="width: 100%"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
import { getMenuDelete } from '../../utils/axios';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  mounted() {
    //组件一加载就触发调取列表
    this.getMenuList();
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),

    /* 编缉按钮 */
    edit(id){
      this.$emit('edit',id)
    },

    /* 删除按钮 */
    del(id){
      this.$confirm("要删除此条数据吗?","提示",{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      })
      .then(()=>{
        getMenuDelete({id}).then(res=>{
          // console.log(res.data)
          if(res.data.code===200){
            this.$message.success(res.data.msg);
            /* 重新获取列表内容 */
            this.getMenuList();
          }else{
            this.$message.success(res.data.msg);
          }
        })
      })
      .catch(()=>{
        this.$message({
           type:'info',
           message:'已取消'
        })
      })
    }
  },
};
</script>

<style lang="" scoped></style>
