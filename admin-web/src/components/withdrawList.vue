<template>
  <div>
  <el-card class="box-card" style="margin-top: 10px; margin-bottom: 10px">
    <el-form label-width="100px" :inline="true">
        <el-row type="flex" justify="start">
        <el-form-item label="申请人" prop="accountName">
            <el-input v-model="param.accountName" placeholder="账户名"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="param.status">
            <el-option value="-1" label="全部" :key="-1"/>
            <el-option value="0" label="待处理" :key="0"/>
            <el-option value="1" label="已提现" :key="1"/>
          </el-select>
        </el-form-item>
        </el-row>
        <el-form-item label="申请时间">
          <el-date-picker
            v-model="param.applyDateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间">
          <el-date-picker
            v-model="param.completeDateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :editable="false">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query()">查询</el-button>
        </el-form-item>
    </el-form>
  </el-card>
    <el-row type="flex" justify="end">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="oldParam.page"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-row>
  <el-card class="box-card" style="margin-top: 10px">
  <el-table
    v-loading="loading"
    :data="list"
    stripe
    style="width: 100%" :fit="true">
    <el-table-column
      prop="id"
      label="ID">
    </el-table-column>
    <el-table-column
      prop="account"
      label="账号">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="提现金额">
    </el-table-column>
    <el-table-column
    prop="rateStr"
    label="手续费率">
  </el-table-column>
    <el-table-column
      prop="actAmount"
      label="实付金额">
    </el-table-column>
    <el-table-column
      prop="applyDate"
      label="申请日期">
    </el-table-column>
    <el-table-column
      prop="completeDate"
      label="完成日期">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <div v-if="scope.row.status == 0">
          <el-button @click="handleWithdraw(scope.row)" type="text" size="small">完成提现</el-button>
        </div>
        <div v-else>
          已提现
        </div>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
  </div>
</template>

<script>
    import withdrawApi from '@/api/withdrawApi.js'

    export default {
      name: "withdrawList",
      data() {
          let data = {
            list: [],
            total: 0,
            param: {
              accountName: '',
              status: '-1',
              applyDateRange: [],
              completeDateRange: [],
              pageSize: 20,
              page: 1
            },
            oldParam: {
              accountName: '',
              status: '-1',
              applyDateRange: [],
              completeDateRange: [],
              pageSize: 20,
              page: 1
            },
            loading: false
          }
          return data
      },
      mounted() {
        this.query()
      },
      methods: {
        handleWithdraw(item) {
          withdrawApi.handleWithdraw(item)
        },
        queryCallback(list, total) {
          this.list = list
          this.total = total
          this.loading = false
        },
        query() {
          this.loading = true
          this.param.page = 1
          this.oldParam.accountName = this.param.accountName
          this.oldParam.status = this.param.status
          this.oldParam.applyDateRange = this.param.applyDateRange
          this.oldParam.completeDateRange = this.param.completeDateRange
          this.oldParam.page = this.param.page
          withdrawApi.query(this.param, this.queryCallback)
        },
        handleCurrentChange(val) {
          this.oldParam.page = val
          this.loading = true
          withdrawApi.query(this.oldParam, this.queryCallback)
        }
      }
    }
</script>

<style scoped>

</style>
