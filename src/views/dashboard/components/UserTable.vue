<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="昵称" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.uNickname | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="头像" min-width="200">
      <template slot-scope="scope">
        <img :src="scope.row.uAvatar" class="emptyGif">
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
      getUserList().then(response => {
        console.log(response)
        this.list = response.data.slice(0, 8)
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
