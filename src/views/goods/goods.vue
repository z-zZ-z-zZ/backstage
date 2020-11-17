<template>
  <div>
    <t-bread />
    <el-button type="primary" plain size="small" @click="add">添加</el-button>
    <!-- 表格渲染 -->
    <v-table @edit="edit" />
    <!-- 弹窗 -->
    <v-dialog ref="dialog" @cancel="cancel" :addIf="addIf" />
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
        isShow: false,
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
    /* 点击显示编缉弹窗 */
    add() {
      this.addIf.isShow = true;
      this.addIf.isAdd = true;
    },
    /* 子组件触发父组件的事件 */
    cancel(e) {
      this.addIf.isShow = e;
    },
    /* 触发父组件编缉事件 */
    edit(e) {
      this.addIf.isShow = true;
      this.addIf.isAdd = false;
      this.$refs.dialog.look(e);
    },
  },
};
</script>

<style lang="" scoped>
</style>
