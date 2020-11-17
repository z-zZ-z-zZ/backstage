<template>
  <div>
    <el-dialog
      :title="addIf.isAdd ? '添加角色' : '修改角色'"
      :visible.sync="addIf.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="rolename"
          label="角色名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限:" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            default-expand-all
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title',
            }"
            show-checkbox
            check-strictly
          >
          </el-tree>
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
import { mapGetters, mapActions } from "vuex";
/* 接口 */
import {
  getRoleEdit,
  getRoleAdd,
  getRoleInfo,
} from "../../utils/axios";
export default {
  data() {
    return {
      form: {
        rolename: "", //角色名称
        menus: "", //角色权限
        status: 1, //状态 1 正常 2 禁用
      },
      /* label的宽度 */
      formLabelWidth: "120px",
      rules: {
        /* 角色性名的验证 */
        rolename: [
          { required: true, message: "请输入角色称呼", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },

  props: ["addIf"],

  mounted() {
    if (this.menuList.length == 0) {
      this.getMenuList();
    }
  },

  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },

  methods: {
    /* 重置事件 */
    reset() {
      this.form = {
        rolename: "", //角色名称
        status: 1, //状态 1 正常 2 禁用
      };
      this.$refs.tree.setCheckedKeys([]);
    },

    /* 点击传递到父组件  修改父组件的弹窗 */
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },

    ...mapActions({
      getMenuList: "menu/getMenuListAction",
      getRoleList: "role/getRoleListAction",
    }),

    /* 添加事件 */
    add() {
      /* 转化menu的数据类型 */
      this.form.menus = this.$refs.tree.getCheckedKeys().join(',');
      getRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          /* 重新调取接口 */
          this.getRoleList();
          /* 关闭弹窗 */
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /* 查看数据 */
    look(id) {
      getRoleInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.menus = this.$refs.tree.setCheckedKeys(
            this.form.menus.split(',')
          );
          this.form.id = id;
        }
      });
    },

    /* 编缉事件 */
    /* 添加事件 */
    update() {
      /* 转化menu的数据类型 */
      this.form.menus = this.$refs.tree.getCheckedKeys().join(',');
      getRoleEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          /* 重新调取接口 */
          this.getRoleList();
          /* 关闭弹窗 */
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
</style>
