<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <!-- <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" /> -->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="PTitle">
              <MDinput v-model="postForm.PTitle" :maxlength="100" name="name" required>
                产品名称
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item prop="PTypeid" label-width="60px" label="类别:" class="postInfo-container-item">
                    <el-select v-model="postForm.PTypeid" placeholder="请选择产品分类">
                      <el-option v-for="(item,index) in productTypeListOptions" :key="index" :label="item.PtName" :value="item.PtID" />
                    </el-select>
                    <!-- <el-input v-model="input" placeholder="请输入产品品牌" /> -->
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-form-item prop="PSource" label-width="120px" label="产地:" class="postInfo-container-item">
                    <!-- <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time" /> -->
                    <el-input v-model="postForm.PSource" placeholder="请输入产品货源地" />
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item prop="PBrand" label-width="90px" label="品牌:" class="postInfo-container-item">
                    <el-input v-model="postForm.PBrand" placeholder="请输入产品品牌" />
                    <!-- <el-rate
                      v-model="postForm.importance"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="display:inline-block"
                    /> -->
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" prop="PBrief" label-width="60px" label="简介:">
          <el-input v-model="postForm.PBrief" :rows="1" type="textarea" class="article-textarea" autosize placeholder="请输入产品的简介信息" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>
        <el-form-item prop="PCover" label="封面:" label-width="60px" style="margin-bottom: 30px;">
          <Upload v-model="postForm.PCover" />
        </el-form-item>
        <el-form-item prop="PCover" label="规格:" label-width="60px" style="margin-bottom: 30px;">
          <el-table
            :data="postForm.ProductSpecs"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="SName"
              label="规格名"
            />
            <el-table-column
              prop="SPrice"
              label="价格"
            />
            <el-table-column
              prop="SState"
              label="状态"
            />
            <el-table-column
              prop="SStock"
              label="库存"
            />
            <el-table-column
              prop="SBrief"
              label="简介"
            />
            <el-table-column align="center" label="操作" width="240">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="editSpecs(scope.$index)">
                  编辑
                </el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="delSpecs(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button v-loading="loading" style="margin-top: 10px;" type="primary" size="small" @click="createSpecs">
            添加新规格
          </el-button>
          <el-dialog title="添加新规格" :visible.sync="dialogFormVisible">
            <el-form ref="productSpecs" :model="productSpecs" :rules="specsRules" class="form-container">
              <div class="postInfo-container">
                <el-form-item prop="SName" label-width="60px" label="名称:" style="margin-bottom: 20px;">
                  <!-- <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date and time" /> -->
                  <el-input v-model="productSpecs.SName" placeholder="请输入规格名称" />
                </el-form-item>
                <el-row style="margin-bottom: 20px;">
                  <el-col :span="8">
                    <el-form-item prop="SState" label-width="60px" label="状态:" class="postInfo-container-item">
                      <el-select v-model="productSpecs.SState" placeholder="请选择规格状态">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item prop="SPrice" label-width="120px" label="价格:" class="postInfo-container-item">
                      <el-input v-model="productSpecs.SPrice" placeholder="请输入规格价格" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="SStock" label-width="90px" label="库存:" class="postInfo-container-item">
                      <el-input v-model="productSpecs.SStock" placeholder="请输入产品库存" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item prop="SBrief" label-width="60px" label="简介:">
                  <el-input v-model="productSpecs.SBrief" type="textarea" placeholder="请输入产品的简介信息" />
                  <!-- <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span> -->
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitSpecs">确 定</el-button>
            </div>
          </el-dialog>
        </el-form-item>
        <label style="width: 60px;font-size: 14px;color: #606266;">详情信息:</label>
        <el-form-item prop="PDetail" style="margin-bottom: 30px;">

          <Tinymce ref="editor" v-model="postForm.PDetail" :height="400" />
        </el-form-item>

      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { getProduct } from '@/api/product'
import { getProductTypeAll } from '@/api/product'
import { saveProduct } from '@/api/product'

const defaultForm = {
  PTitle: '',
  PDetail: '',
  PBrief: '',
  PCover: '',
  PSource: '',
  PID: undefined,
  PTypeid: '',
  ProductSpecs: []
}

export default {
  name: 'ProductDetail',
  components: { Tinymce, MDinput, Upload, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      specsModel: false,
      specsIndex: 0,
      productTypeListOptions: [],
      rules: {
        PCover: [{ validator: validateRequire }],
        PTitle: [{ validator: validateRequire }],
        PDetail: [{ validator: validateRequire }],
        PBrief: [{ validator: validateRequire }],
        PSource: [{ validator: validateRequire }],
        PTypeid: [{ validator: validateRequire }]
      },
      specsRules: {
        SName: [{ validator: validateRequire }],
        SState: [{ validator: validateRequire }],
        SPrice: [{ validator: validateRequire }],
        SBrief: [{ validator: validateRequire }],
        SStock: [{ validator: validateRequire }]
      },
      dialogFormVisible: false,
      productSpecs: {
        SState: 1,
        SBrief: '',
        SName: '',
        SPrice: 0.00,
        SStock: 0

      },
      formLabelWidth: '120px',
      options: [{
        value: 1,
        label: '生效'
      }, {
        value: 0,
        label: '失效'
      }]
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.PBrief.length
    },
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
    this.getProductTypeList()
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      getProduct({ id: id }).then(response => {
        console.log(response)
        this.postForm = response.Data
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          saveProduct(this.postForm).then(res => {
            this.$notify({
              title: '成功',
              message: '保存产品成功',
              type: 'success',
              duration: 2000
            })
            this.loading = false

            this.$router.push('/product')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    createSpecs() {
      this.specsModel = true
      this.dialogFormVisible = true
      this.$refs['productSpecs'].resetFields()
    },
    editSpecs(index) {
      this.specsModel = false
      this.dialogFormVisible = true
      var specs = this.postForm.ProductSpecs[index]
      this.productSpecs = {
        SState: specs.SState,
        SBrief: specs.SBrief,
        SName: specs.SName,
        SPrice: specs.SPrice,
        SStock: specs.SStock
      }
      this.specsIndex = index
    },
    submitSpecs() {
      this.$refs.productSpecs.validate(valid => {
        if (valid) {
          if (this.specsModel) {
            this.postForm.ProductSpecs.push({
              SState: this.productSpecs.SState,
              SBrief: this.productSpecs.SBrief,
              SName: this.productSpecs.SName,
              SPrice: parseFloat(this.productSpecs.SPrice),
              SStock: parseInt(this.productSpecs.SStock)
            })
          } else {
            this.postForm.ProductSpecs[this.specsIndex] = {
              SState: this.productSpecs.SState,
              SBrief: this.productSpecs.SBrief,
              SName: this.productSpecs.SName,
              SPrice: parseFloat(this.productSpecs.SPrice),
              SStock: parseInt(this.productSpecs.SStock)
            }
          }

          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    delSpecs(index) {
      this.postForm.ProductSpecs.splice(index, 1)
    },
    getProductTypeList() {
      getProductTypeAll().then(response => {
        if (!response.Data) return
        this.productTypeListOptions = response.Data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
