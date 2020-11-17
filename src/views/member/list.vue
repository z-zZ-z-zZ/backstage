<template>
  <div>
    <el-table :data="memberList" style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      memberList: "member/getMemberList"
    }),
  },
  mounted(){
    this.getMemberAction()
  },

  methods: {
    ...mapActions({
      getMemberAction: "member/getMemberListAction",
      
    }),
   
    /* 编缉事件--传递到父组件 */
    edit(uid) {
      this.$emit("edit", uid);
    },
  },
};
</script>

<style lang="" scoped>
</style>
