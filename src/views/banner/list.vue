<template>
  <div>
    <el-table
      :data="bannerList"
      style="width: 100%"
      row-key="id"
      default-expand-all
    >
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>

      <el-table-column prop="title" label="标题" width="180"> </el-table-column>

      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl + item.row.img" alt="" />
          </div>
        </template>
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
          <el-button type="info" @click="edit(item.row.id)">编缉</el-button>
          <el-button type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getBannerDelete } from "../../utils/axios";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      bannerList: "banner/getBannerList",
    }),
  },

  mounted() {
    this.getBannerListAction();
  },

  methods: {
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction",
    }),
    /* 删除事件 */
    del(id) {
      this.$confirm("是否删除本条数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      })
        .then(() => {
          getBannerDelete({ id }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getBannerListAction();
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
  },
};
</script>

<style lang="" scoped>
img {
  height: 150px;
  width: auto;
}
</style>
