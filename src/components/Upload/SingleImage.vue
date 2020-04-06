<template>
  <div class="upload-container">
    <el-upload
      :data="dataObj"
      accept="image"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      :on-error="handleImageError"
      class="image-uploader"
      drag
      :before-upload="beforeUpload"
      action="http://upload-z2.qiniup.com"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将封面图片拖到此处，或<em>点击上传</em>选择封面图片
      </div>
    </el-upload>
    <div class="image-preview" v-loading="loading">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl+'?imageView2/1/w/200/h/200'">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/api/qiniu'

export default {
  name: 'SingleImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { 'token': '' },
      loading: false
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    rmImage() {
      this.emitInput('')
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleImageSuccess(res) {
      this.emitInput(this.tempUrl + '/' + res.key)
      this.loading = false
    },
    handleImageError(err) {
      this.$message.error(err)
      this.loading = false
    },
    beforeUpload(file) {
      const _self = this
      _self.loading = true
      const type = this.isImage(file.name)
      if (!type) {
        // 若不符合图片类型，则让当前上传的文件去除掉即可，即从上传对列删除本次上传
        this.$message.error('只允许上传图片')
        this.loading = false
        return false
      }
      return new Promise((resolve, reject) => {
        getToken().then(response => {
          const token = response.Data.Token
          _self.dataObj.token = token
          this.tempUrl = response.Data.Url
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    isImage(fileName) {
      if (typeof fileName !== 'string') return
      const name = fileName.toLowerCase()
      return name.endsWith('.png') || name.endsWith('.jpeg') || name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.bmp')
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    .upload-container {
        width: 100%;
        position: relative;
        @include clearfix;
        .image-uploader {
            width: 60%;
            float: left;
        }
        .image-preview {
            width: 200px;
            height: 200px;
            position: relative;
            border: 1px dashed #d9d9d9;
            float: left;
            margin-left: 50px;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                .el-icon-delete {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
    }

</style>
