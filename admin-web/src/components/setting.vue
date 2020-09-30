<template>
    <div>
      <el-card class="box-card">
        <el-form label-width="100px">
          <el-form-item label="最低提现额度" prop="limit">
            <el-col :span="6">
              <el-input v-model="limit" placeholder="0" type="number"></el-input>
            </el-col>
            <el-button @click="submitLimit()"style="margin-left: 10px">保存</el-button>
          </el-form-item>
          <el-form-item label="提现手续费率" prop="rate">
            <el-col :span="6">
              <el-input v-model="rate" placeholder="0" max="100" min="0" type="number">
                <template slot="append">%</template>
              </el-input>
            </el-col>
            <el-button @click="submitRate()" style="margin-left: 10px">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
    import settingApi from '@/api/settingApi.js'

    export default {
        name: "setting",
        data() {
          let data = {
            limit: 0,
            rate: 0
          }
          settingApi.init(data)
          return data
        },
        methods: {
          submitLimit() {
            settingApi.submitLimit(this.limit)
          },
          submitRate() {
            settingApi.submitRate(this.rate)
          }
        }
    }
</script>

<style scoped>
  .input_row {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
