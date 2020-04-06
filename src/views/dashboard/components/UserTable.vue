<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="昵称" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.UNickname | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="头像" min-width="200">
      <template slot-scope="scope">
        <img :src="scope.row.UAvatar" class="emptyGif">
      </template>
    </el-table-column>
    <el-table-column label="注册时间" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.UCreatetime }}
      </template>
    </el-table-column>
    <!-- <el-table-column label="Price" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.uState | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Status" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var param = { 'page': 1, 'size': 10 }
      getUserList(param).then(response => {
        console.log(response)
        this.list = response.Data.Users
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 10%;
  }
</style>
