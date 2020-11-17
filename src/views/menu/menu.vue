<template>
  <div>
    <t-bread />
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="isAdd">添加</el-button>

    <!-- 表格渲染 -->
    <v-table @edit="edit"></v-table>

    <!-- 点击添加弹出弹窗 -->
    <v-dialog ref='dialog' @cancel="cancel" :addIf="addIf"></v-dialog>
  </div>
</template>

<script>
import tBread from "../../components/bread";
import vTable from "./list";
import vDialog from "./dialog";
export default {
  data() {
    return {
      addIf: {
        /* 用来打开编辑弹窗 */
        isShow: false,
        /* 判断是添加还是编缉 */
        isAdd: true,
      },
    };
  },
  components: {
    tBread,
    vTable,
    vDialog,
  },
  methods: {
    /* 添加事件 */
    isAdd() {
      this.addIf.isShow = true;
      this.addIf.isAdd = true;
    },
    /* 子组件传值 */
    cancel(e) {
      this.addIf.isShow = e;
    },

    /* 编缉视图 */
    edit(e) {
      /* 显示弹窗 */
      this.addIf.isShow = true;
      /* 表示此弹窗是编缉窗口 */
      this.addIf.isAdd = false;

      // console.log(this.$refs.dialog.look(e))

      this.$refs.dialog.look(e)
    },
  },
};
</script>

<style lang="" scoped>
</style>
