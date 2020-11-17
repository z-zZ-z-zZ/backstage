<template>
  <div>
    <t-bread />
    <!-- 表单渲染 -->
    <v-table @edit='edit'/>
    <!-- 编缉弹框 -->
    <v-dialog ref="dialog" @cancel='cancel' :addIf='addIf'/>
  </div>
</template>

<script>
import tBread from "../../components/bread";
import vTable from "./list";
import vDialog from "./dialog";

export default {
  data() {
    return {
      addIf:{
        isShow:false,
      }
    };
  },
  components: {
    tBread,
    vTable,
    vDialog
  },
  methods:{

    /* 子组件触发父组件的事件 */
    cancel(){
      this.addIf.isShow = false
    },
    /* 触发父组件编缉事件 */
    edit(e){
      this.addIf.isShow = true;
      this.$refs.dialog.look(e)
    }
  }

};
</script>

<style lang="" scoped>
</style>
