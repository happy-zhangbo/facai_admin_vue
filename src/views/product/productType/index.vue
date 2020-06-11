<template>
  <div class="app-container" v-loading="loading">
    <router-link :to="'/product/createProductType'">
      <el-button type="primary" style="margin-bottom: 1.25rem;" icon="el-icon-plus">添加新类别</el-button>
    </router-link>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.PtID }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.PtName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.PtCreatetime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="240">
        <template slot-scope="scope">
          <router-link :to="'/product/editProductType/'+scope.row.PtID">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <!-- <el-button type="danger" size="small" icon="el-icon-delete" @click="delProductType(scope.row,scope.$index)">
            删除
          </el-button> -->

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { getProductTypeList } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ProductList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10
      },
      loading:false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getProductTypeList(this.listQuery).then(response => {
        this.list = response.Data.ProductType
        this.total = response.Data.Total
        this.listLoading = false
      })
    },
    delProductType(row, index) {
      //this.loading = true
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
