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
        <div class="block">
          <span class="demonstration">调整每页显示条数</span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="pageCount">
          </el-pagination>
        </div>
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
            departmentCondition:'',
            currentPage:1,
            pageSize:10,
            pageCount:1
          }
      },created:function() {

      },methods:{
          onTapSearch:function () {
            this.getDepartmentsByPage(1)
            this.getPageCount()
          },
        /**
         * 通过dId得到accounts
         */
        getAccountsByDId:function(){
          this.accounts = []

          for(let i = 0; i < this.departmentList.length; i++){
              const tempDepartment = this.departmentList[i]
              if(this.departmentCondition === "执行科室"){
                this.$axios({
                  url:'workloadsCount/getWorkloadsCountBydId',
                  method:'post',
                  data:{
                    beginTime:this.dates[0].getTime()/1000,
                    endTime:this.dates[1].getTime()/1000,
                    dId:tempDepartment.dId
                  }
                }).then(response=>{
                  this.pushAccountIntoAccounts(tempDepartment, response.data)
                })
              }else{
                this.$axios({
                  url:'workloadsCount/getWorkloadsCountByPostDId',
                  method:'post',
                  data:{
                    beginTime:this.dates[0].getTime()/1000,
                    endTime:this.dates[1].getTime()/1000,
                    postDId:tempDepartment.dId
                  }
                }).then(response=>{
                  this.pushAccountIntoAccounts(tempDepartment, response.data)
                })
              }

          }
        },
        /**
         * 将account推入accounts
         */
        pushAccountIntoAccounts:function(tempDepartment,data){
          this.accounts.push({
            dName:tempDepartment.dName,
            visits:data.visits,
            diagnosticFee:data.diagnosticFee,
            examinationFee:data.examinationFee,
            invoiceNum:data.invoiceNum,
            materialFee:data.materialFee,
            otherFee:data.otherFee,
            registrationFee:data.registrationFee,
            surgeryFee:data.surgeryFee,
            treatmentFee:data.treatmentFee,
            xyFee:data.xyFee,
            zyFee:data.zyFee,
            testFee:data.testFee
          })
        },
        /**
         * 得到页数
         * */
        getPageCount:function(){
          let that = this
          this.$axios({
            url:"department/getDepartmentCount",
            method:"post"
          }).then(response=>{
            console.log(response.data)
            that.pageCount = response.data
          }).catch(err=>{
            console.log(err)
          })
        },
        /**
         * 分页得到departments
         * */
        getDepartmentsByPage:function (pageNum) {
          let that = this;
          pageNum = pageNum - 1
          pageNum = pageNum * that.pageSize
          console.log(that.pageSize)
          this.$axios({
            url: 'department/getDepartmentByPage',
            method:"post",
            data:{
              pageNum:pageNum,
              pageSize:that.pageSize
            }
          }).then(response => {
            that.departmentList = response.data
            this.getAccountsByDId()
          }).catch(err=>{
            console.log(err)
          })
        },
        /**
         * 分页
         */
        handleSizeChange:function (pageSize) {
          this.pageSize = pageSize
          this.getDepartmentsByPage(this.currentPage)
        },
        /**
         * 分页
         */
        handleCurrentChange:function () {
          this.getDepartmentsByPage(this.currentPage)
        }
        }
    }
</script>

<style scoped>

</style>
