<template>
  <el-container>
    <el-header style="height: auto;">
      <div class="block">
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
          prop="uName"
          width="150"></el-table-column>
        <el-table-column
          prop="visits"
          label="看诊人次"
          width="100"></el-table-column>
        <el-table-column
          prop="invoiceNum"
          label="发票数量"
          width="100"></el-table-column>
        <el-table-column
          prop="xyFee"
          label="西药费"
          width="100"></el-table-column>
        <el-table-column
          prop="zyFee"
          label="中药费"
          width="100"></el-table-column>
        <el-table-column
          prop="registrationFee"
          label="挂号费"
          width="100"></el-table-column>
        <el-table-column
          prop="diagnosticFee"
          label="诊查费"
          width="100"></el-table-column>
        <el-table-column
          prop="examinationFee"
          label="检查费"
          width="100"></el-table-column>
        <el-table-column
          prop="testFee"
          label="检验费"
          width="100"></el-table-column>
        <el-table-column
          prop="treatmentFee"
          label="治疗费"
          width="100"></el-table-column>
        <el-table-column
          prop="materialFee"
          label="材料费"
          width="100"></el-table-column>
        <el-table-column
          prop="surgeryFee"
          label="手术费"
          width="100"></el-table-column>
        <el-table-column
          prop="otherFee"
          label="其他治疗费"
          width="100"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "financeOfUser",
      data(){
          return{
            accounts:[],
            currentPage:1,
            pageSize:10,
            pageCount:1,
            userList:[],
            dates:[]
          }
      },created:function() {
          this.$axios({
            url:'user/getAllUser',
            method:'post'
          }).then(response=>{
            this.userList = response.data
          })
      },methods:{
        onTapSearch:function () {
          this.accounts = []
          for(let i = 0; i < this.userList.length; i++){
            let tempUser = this.userList[i]
            this.axios({
              url:'workloadsCount/getWorkloadsCountByuId',
              method: 'post',
              data:{
                uId:tempUser.uId,
                beginTime:this.dates[0].getTime()/1000,
                endTime:this.dates[1].getTime()/1000,
              }
            }).then(response=>{
              this.accounts.push({
                uName:tempUser.uName,
                visits:response.data.visits,
                diagnosticFee:Math.round(response.data.diagnosticFee * 100)/100,
                examinationFee:Math.round(response.data.examinationFee * 100)/100,
                invoiceNum:response.data.invoiceNum,
                materialFee:Math.round(response.data.materialFee * 100) /100,
                otherFee:Math.round(response.data.otherFee * 100) / 100,
                registrationFee:Math.round(response.data.registrationFee * 100) / 100,
                surgeryFee:Math.round(response.data.surgeryFee * 100) / 100,
                treatmentFee:Math.round(response.data.treatmentFee * 100) / 100,
                xyFee:Math.round(response.data.xyFee * 100) / 100,
                zyFee:Math.round(response.data.zyFee * 100) / 100,
                testFee:Math.round(response.data.testFee * 100) / 100
              })
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>
