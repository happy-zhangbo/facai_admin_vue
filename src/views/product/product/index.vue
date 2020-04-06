<template>
  <div class="app-container">
    <router-link :to="'/product/createProduct'">
      <el-button type="primary" style="margin-bottom: 1.25rem;" icon="el-icon-plus">添加新产品</el-button>
    </router-link>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.PID }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.PTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类别">
        <template slot-scope="scope">
          <span>{{ scope.row.PTypeid }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态">
        <template slot-scope="scope">
          <el-tag v-show="scope.row.PState==0" type="info" effect="dark">
            已下架
          </el-tag>
          <el-tag v-show="scope.row.PState==1" type="success">
            已上架
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="封面">
        <template slot-scope="scope">
          <img :src="scope.row.PCover" class="emptyGif" width="50" height="50">
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.PCreatetime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="240">
        <template slot-scope="scope">
          <router-link :to="'/product/editProduct/'+scope.row.PID">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <router-link :to="'/example/edit/'+scope.row.PID">
            <el-button type="danger" size="small" icon="el-icon-delete">
              下架
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { getProductList } from '@/api/product'
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getProductList(this.listQuery).then(response => {
        this.list = response.Data.Product
        this.total = response.Data.Total
        this.listLoading = false
      })
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
