<template>
  <div>
    <el-dialog
      :title="addIf.isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="addIf.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="roleid"
          label="所属角色:"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <!-- 下拉框循环我的菜单列表 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="username"
          label="用户名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
import { getUserAdd, getUserInfo, getUserEdit } from "../../utils/axios";
export default {
  data() {
    return {
      form: {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //面膜
        status: 1, //状态 1 正常 2 禁用
      },
      /* label的宽度 */
      formLabelWidth: "120px",
      rules: {
        /* 角色性名的验证 */
        username: [
          { required: true, message: "请输入角色称呼", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/getRoleList",
    }),
  },
  props: ["addIf"],

  mounted() {
    if (this.roleList.length == 0) {
      this.getRoleList();
    }
  },

  methods: {
    /* 重置事件 */
    reset() {
      this.form = {
        roleid: "", //角色编号
        username: "", //管理员名称
        password: "", //面膜
        status: 1, //状态 1 正常 2 禁用
      };
    },

    /* 点击传递到父组件  修改父组件的弹窗 */
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },

    ...mapActions({
      getRoleList: "role/getRoleListAction",
      getUserList: "user/getUserAction",
      getCountAction: "user/getCountAction",
    }),

    /* 添加事件 */
    add() {
      /* 转化menu的数据类型 */
      getUserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          /* 重新调取接口 */
          this.getUserList();
          /* 获取总数据条数 */
          this.getCountAction();
          /* 关闭弹窗 */
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /* 查看数据 */
    look(uid) {
      getUserInfo({ uid }).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
        }
      });
    },

    /* 编缉事件 */
    /* 添加事件 */
    update() {
      /* 转化menu的数据类型 */
      getUserEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          /* 重新调取接口 */
          this.getRoleList();
          /* 获取总数据条数 */
          this.getCountAction();
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
