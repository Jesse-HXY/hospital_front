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
        </div>
        <br>
        <div class="block">
          <el-select v-model="departmentCondition">
            <el-option value="执行科室" label="执行科室"></el-option>
            <el-option value="开单科室" label="开单科室"></el-option>
          </el-select>
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
        name: "financeOfDepartment",
      data(){
          return{
            dates:[],
            accounts:[],
            departmentList:[],
            departmentCondition:''
          }
      },created:function() {
        let that = this
        this.$axios({
          url:"department/getAllDepartments",
          method:"post",
        }).then(response=>{
          that.departmentList = response.data
        })
      },methods:{
          onTapSearch:function () {
            for(let i = 0; i < this.departmentList.length; i++){
              const tempDId = this.departmentList[i].dId
              this.$axios({
                url:'workloadsCount/getWorkloadsCountBydId',
                method:'post',
                data:{
                  beginTime:this.dates[0].getTime()/1000,
                  endTime:this.dates[1].getTime()/1000,
                  dId:tempDId
                }
              }).then(response=>{
                console.log(response.data)
                this.accounts.push({
                  dName:this.departmentList[i].dName,
                  visits:response.data.visits,
                  diagnosticFee:response.data.diagnosticFee,
                  examinationFee:response.data.examinationFee,
                  invoiceNum:response.data.invoiceNum,
                  materialFee:response.data.materialFee,
                  otherFee:response.data.otherFee,
                  registrationFee:response.data.registrationFee,
                  surgeryFee:response.data.surgeryFee,
                  treatmentFee:response.data.treatmentFee,
                  xyFee:response.data.xyFee,
                  zyFee:response.data.zyFee,
                  testFee:response.data.testFee
                })

              })
            }
          }
        }
    }
</script>

<style scoped>

</style>
