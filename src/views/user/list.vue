<template>
  <div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="roleid" label="所属角色" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button type="info" @click="edit(item.row.uid)">编缉</el-button>
          <el-button type="danger" @click="del(item.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页视图 -->
    <el-pagination
      :page-size="userSize"
      background
      layout="prev, pager, next"
      :total="userCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getUserDelete } from "../../utils/axios";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      userCount:'user/getUserCount',
      userSize:'user/getUserSize'
    }),
  },

  mounted() {
    this.getUserAction();
    this.getUserCount();
  },

  methods: {
    ...mapActions({
      getUserAction: "user/getUserAction",
      getUserCount:'user/getCountAction',
      changePage:'user/changePageAction'
    }),
    /* 删除事件 */
    del(uid) {
      this.$confirm("是否删除本条数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      })
        .then(() => {
          getUserDelete({ uid }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getUserAction();
              this.getUserCount();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消",
          });
        });
    },
    /* 编缉事件--传递到父组件 */
    edit(id) {
      this.$emit("edit", id);
    },
    currentChange(e){
      this.changePage(e)
    }
  },
};
</script>

<style lang="" scoped>
</style>
