<template>
  <div>
    <el-dialog
      :title="addIf.isAdd ? '添加规格属性' : '修改规格属性'"
      :visible.sync="addIf.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="specsname"
          label="规格名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-input
            class="Sizeinput"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index == 0" @click="addAttr" type="primary"
            >新增规格属性</el-button
          >
          <el-button v-else @click="delAttr(index)" type="danger"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addIf.isAdd" @click="add" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* 引入辅助性函数 */
import { mapActions } from "vuex";
/* 接口 */
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../utils/axios";
export default {
  data() {
    return {
      arrAttr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1, //状态 1 正常 2 禁用
      },
      /* label的宽度 */
      formLabelWidth: "120px",
      rules: {
        /* 角色性名的验证 */
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
    };
  },

  props: ["addIf"],

  methods: {
    addAttr() {
      if (this.arrAttr.length <= 5) {
        //往数组中添加数据
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多允许添加五项");
      }
    },
    delAttr(index) {
      this.arrAttr.splice(index, 1);
    },
    /* 重置事件 */
    reset() {
      (this.form = {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1, //状态 1 正常 2 禁用
      }),
        (this.arrAttr = [{ value: "" }]);
    },

    /* 点击传递到父组件  修改父组件的弹窗 */
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },

    ...mapActions({
      getSpecsList: "specs/getSpecsAction",
      getCountAction: "specs/getCountAction",
    }),

    /* 添加事件 */
    add() {
      /* 转化menu的数据类型 */
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      //修改属性值
      // 调取添加接口
      getSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /* 查看数据 */
    look(id) {
      //调取查看接口
      getSpecsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.list[0];
          this.form = data;
          data.attrs.map((item, index) => {
            if (index == 0) {
              //如果索引是0 就强制匹配第一项
              this.arrAttr[0].value = item;
            } else {
              this.arrAttr.push({
                value: item,
              });
            }
          });
        }
      });
    },

    /* 编缉事件 */
    update() {
      /* 转化menu的数据类型 */
      this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
      //修改属性值
      // 调取添加接口
      getSpecsEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.Sizeinput {
  width: 200px;
}
</style>
