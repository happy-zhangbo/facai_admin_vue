<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单编号" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.OSerialNum | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="订单价格" min-width="200">
      <template slot-scope="scope">
        ¥{{ scope.row.OTotalAmount }}
      </template>
    </el-table-column>
    <el-table-column label="状态" min-width="200">
      <template slot-scope="scope">
        <el-tag v-show="scope.row.OState==-1" type="info" effect="dark">
          订单已取消
        </el-tag>
        <el-tag v-show="scope.row.OState==-2" type="danger">
          支付失败
        </el-tag>
        <el-tag v-show="scope.row.OState==0" type="">
          待支付
        </el-tag>
        <el-tag v-show="scope.row.OState==1" type="warning" effect="dark">
          待发货
        </el-tag>
        <el-tag v-show="scope.row.OState==2" type="">
          已发货
        </el-tag>
        <el-tag v-show="scope.row.OState==3" type="success">
          订单已完成
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="联系人" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.OLink }}
      </template>
    </el-table-column>
    <el-table-column label="送货地址" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.OAddress }}
      </template>
    </el-table-column>
    <el-table-column label="指定送达时间" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.ODeliverytime }}
      </template>
    </el-table-column>
    <el-table-column label="创建时间" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.OCreatetime }}
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
import { getOrderList } from '@/api/order'

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
      getOrderList(param).then(response => {
        console.log(response)
        this.list = response.Data.Order
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
