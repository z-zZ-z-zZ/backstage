<template>
  <div>
    <el-dialog
      :title="addIf.isAdd ? '添加商品' : '修改商品'"
      :visible.sync="addIf.isShow"
      :before-close="cancel"
      center
      @opened="createEditor"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="first_cateid"
          label="一级分类:"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.first_cateid" @change="changeCate(false)">
            <el-option value label="请选择" disabled></el-option>
            <!-- 下拉框--一级菜单 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="second_cateid"
          label="二级分类:"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.second_cateid">
            <el-option value label="请选择" disabled></el-option>
            <!-- 下拉框---二级菜单 -->
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="goodsname"
          label="商品名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="price" label="价格:" :label-width="formLabelWidth">
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="market_price"
          label="市场价格:"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="img" label="图片" :label-width="formLabelWidth">
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

        <el-form-item
          prop="specsid"
          label="商品规格:"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.specsid" @change="changeSpecs(false)">
            <el-option value label="请选择" disabled></el-option>
            <!-- 下拉框---商品规格 -->
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="specsattr"
          label="规格属性:"
          :label-width="formLabelWidth"
        >
          <!-- multiple  是否多选-->
          <el-select v-model="form.specsattr"  multiple>
            <el-option value label="请选择" disabled></el-option>
            <!-- 下拉框----规格属性 -->
            <el-option
              v-for="item in attrArr"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品:" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖:" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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

        <el-form-item
          prop="description"
          label="商品描述:"
          :label-width="formLabelWidth"
        >
          <!-- 富文本编辑器 -->
          <div id="editor"></div>
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
/* 引入富文本 */
import E from "wangeditor";
/* 引入辅助性函数 */
import { mapGetters, mapActions } from "vuex";
/* 接口 */
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../utils/axios";
export default {
  data() {
    return {
      editor: null /* 富文本编辑器变量 */,
      form: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        img: "", //商品图片
        price: "", //商品价格
        market_price: "", //市场价格
        specsid: "", //商品规格编号
        specsattr: "", //商品规格的相关内容
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        description: "", //商品描述
        status: 1, //状态 1 正常 2 禁用
      },
      /* label的宽度 */
      formLabelWidth: "120px",
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "商品价格必须为数字" },
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "市场价格必须为数字" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" },
        ],
      },
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      secondArr: [], //二级分类
      attrArr: [], //规格属性
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
      specsList: "specs/getSpecsList",
    }),
  },
  props: ["addIf"],
  mounted() {
    this.getSpecsList();
    this.getCateList();
  },

  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsAction",
      getGoodsCount: "goods/getCountAction",
      getSpecsList: "specs/getSpecsAction",
      getCateList: "cate/getCateListAction",
    }),
    //表单打开加载富文本编辑器
    createEditor() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },

    /* 一级分类触发change事件 */
    changeCate(n) {
      let index = this.cateList.findIndex((item, i) => {
        return this.form.first_cateid == item.id;
      });
      this.secondArr = this.cateList[index].children;
      if (!n) {
        this.form.second_cateid = "";
      }
    },
    /* 商品规格触发的change事件 */
    changeSpecs(n) {
      let index = this.specsList.findIndex(
        (item) => this.form.specsid == item.id
      );
      this.attrArr = this.specsList[index].attrs;
      if (!n) {
        this.form.specsattr = [];
      }
    },

    /* 重置事件 */
    reset() {
      this.form = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        img: "", //商品图片
        price: "", //商品价格
        market_price: "", //市场价格
        specsid: "", //商品规格编号
        specsattr: "", //商品规格的相关内容
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        description: "", //商品描述
        status: 1, //状态 1 正常 2 禁用
      };
      /* 图片列表 */
      this.fileList = [];
      /* 二级分类 */
      this.secondArr = [];
      /* 规格属性 */
      this.attrArr = [];
      /* 清空规则验证 */
      this.$refs["formDialog"].resetFields();
    },
    //当图片上传时触发的文件
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

    /* 查看数据 */
    look(id) {
      getGoodsInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          let data = res.data.list;
          this.form = data;
          this.form.id = id;
          this.fileList = this.form.img
            ? [{ url: this.$imgUrl + this.form.img }]
            : [];
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.split(",")
            : [];
          this.changeCate(true);
          this.changeSpecs(true);
        }
      });
    },

    /* 添加事件 */
    add() {
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      this.form.img = this.imgUrl;
      this.form.description = this.editor.txt.html();
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      getGoodsAdd(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getGoodsList();
          this.getGoodsCount();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    /* 编缉事件 */
    update() {
      this.form.specsattr = this.form.specsattr
        ? this.form.specsattr.join(",")
        : "";
      this.form.img = this.imgUrl;
      this.form.description = this.editor.txt.html();
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      getGoodsEdit(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getGoodsList();
          this.getGoodsCount();
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
