<template>
  <div>
    <el-dialog
      :title="addIf.isAdd ? '添加轮播图' : '修改轮播图'"
      :visible.sync="addIf.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="title"
          label="标题:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop='img' label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
        <el-button v-if="addIf.isAdd" @click="add('formDialog')" type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update('formDialog')" type="primary"
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* 引入辅助性函数 */
import { mapGetters, mapActions } from "vuex";
/* 接口 */
import { getBannerAdd,getBannerInfo,getBannerEdit } from "../../utils/axios";
export default {
  data() {
    return {
      form: {
        title: "", //轮播图标题
        img: "", //图片
        status: 1, //状态 1 正常 2 禁用
      },
      /* label的宽度 */
      formLabelWidth: "120px",
      rules: {
        /* 角色性名的验证 */
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
    };
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/getBannerList",
    }),
  },
  props: ["addIf"],

  methods: {
    /* 重置事件 */
    reset() {
      this.form = {
        title: "", //轮播图标题
        img: "", //图片
        status: 1, //状态 1 正常 2 禁用
      };
    },
    //onChange 当图片上传时触发的文件
    onChange(file) {
      this.imgUrl = file.raw;
    },
    //图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片移除
    onRemove(file, fileList) {},
    //文件上传限制
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择${files.length} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },

    /* 点击传递到父组件  修改父组件的弹窗 */
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },

    ...mapActions({
      getBannerList: "banner/getBannerListAction",
    }),

    /* 查看数据 */
    look(id) {
      getBannerInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          //把图片格式进行转化
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /* 添加事件 */
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //参数不能用form表单提交  用FormDate对象形式
          //将普通表单改成FormDate 通过append添加属性
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append("img", this.imgUrl);

          //调取添加接口
          getBannerAdd(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    /* 编缉事件 */
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //把数据修改成formData形式
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          // 三目运算判断是否传入新的图片
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);
          getBannerEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //下拉菜单修改触发的事件
    changeMenu() {
      //通过用户的选择来渲染菜单类型
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
  },
};
</script>

<style lang="" scoped>
</style>
