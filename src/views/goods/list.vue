<template>
  <div>
    <el-table
      :data="goodsList"
      style="width: 100%"
    >
      <el-table-column prop="id" label="商品编号" width="180">
      </el-table-column>

      <el-table-column prop="goodsname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="180">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="180">
      </el-table-column>

      <el-table-column prop='img' label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl + item.row.img" alt="" />
          </div>
        </template>
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column  label="是否热卖">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
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
    <!-- 分页视图 -->
    <el-pagination
      :page-size="goodsSize"
      background
      layout="prev, pager, next"
      :total="goodsCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getGoodsDelete } from "../../utils/axios";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsCount: "goods/getGoodsCount",
      goodsSize: "goods/getGoodsSize",
    }),
  },

  mounted() {
    this.getGoodsListAction();
    this.getGoodsCount();
  },

  methods: {
    ...mapActions({
      getGoodsListAction: "goods/getGoodsAction",
      getGoodsCount: "goods/getCountAction",
      changePage: "goods/changePageAction",
    }),
    /* 删除事件 */
    del(id) {
      this.$confirm("是否删除本条数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      })
        .then(() => {
          getGoodsDelete({ id }).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.msg);
              this.getGoodsListAction();
              this.getGoodsCount();
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
img {
  height: 150px;
  width: auto;
}
</style>
