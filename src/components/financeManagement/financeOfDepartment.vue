<template>
    <el-container>
      <el-header>
        <div class="block">?
          <el-date-picker
            v-model="dates"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
          <el-button type="primary" @click="onTapSearch">查询</el-button>
        </div>
      </el-header>
      <el-main>
        <el-table
          :data="accounts"
          stripe
        >
          <el-table-column
          prop="dName"
          width="150"></el-table-column>
          <el-table-column
            prop=""
            label="看诊人次"
            width="100"></el-table-column>
          <el-table-column
            prop=""
            label="发票数量"
            width="100"></el-table-column>
          <el-table-column
            prop=""
            label="西药费"
            width="100"></el-table-column>
          <el-table-column
            prop=""
            label="中药费"
            width="100"></el-table-column>
          <el-table-column
            prop=""
            label="挂号费"
            width="100"></el-table-column>
          <el-table-column
            prop=""
            label="诊查费"
            width="100"></el-table-column>
          <el-table-column
            prop=""
            label="检查费"
            width="100"></el-table-column>
          <el-table-column
            prop=""
            label="检验费"
            width="100"></el-table-column>
          <el-table-column
            prop=""
            label="治疗费"
            width="200"></el-table-column>
          <el-table-column
            prop=""
            label="材料费"
            width="200"></el-table-column>
          <el-table-column
            prop=""
            label="手术费"
            width="200"></el-table-column>
          <el-table-column
            prop=""
            label="其他治疗费"
            width="200"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "financeOfDepartment",
      data(){
          return{
            dates:[],
            accounts:[]
          }
      },methods:{
          onTapSearch:function () {

          }
      }
    }
</script>

<style scoped>

</style>
