<template>
  <el-container>
    <el-header style="text-align: left">
        患者姓名：
      <div style="display: inline-block;">
        <el-input v-model="searchPName"></el-input>
      </div>
      &nbsp&nbsp&nbsp病历号：
      <div style="display: inline-block;">
        <el-input v-model="searchRId"></el-input>
      </div>
      &nbsp&nbsp&nbsp<el-button @click="onTapSearch" type="primary" icon="el-icon-search">查询</el-button>
    </el-header>
    <el-header style="text-align: left">
      患者信息确认:
      <el-tag>病历号</el-tag>&nbsp{{patient.rId}}&nbsp
      <el-tag>姓名</el-tag>&nbsp{{patient.pName}}&nbsp
      <el-tag>身份证号</el-tag>&nbsp{{patient.pId}}&nbsp
      <br><br>
      执行科室：
      <div style="display: inline-block;">
        <el-select v-model="dId" filterable placeholder="请选择">
          <div v-for="item in departmentList">
            <el-option :key="item.dId" :value="item.dId" :label="item.dName"></el-option>
          </div>
        </el-select>
      </div>
      <el-main>
        <el-tabs>
          <el-tab-pane label="患者检查"><patientExamination v-bind:rId="patient.rId" v-bind:dId="dId"></patientExamination></el-tab-pane>
          <el-tab-pane label="患者检验"><patientTest v-bind:rId="patient.rId" v-bind:dId="dId"></patientTest></el-tab-pane>
          <el-tab-pane label="患者处置"><patientDispose v-bind:rId="patient.rId" v-bind:dId="dId"></patientDispose></el-tab-pane>
        </el-tabs>
      </el-main>
    </el-header>
        <el-dialog :visible.sync="patientChooseDialogVisible" width="1000px">
          <el-table
            ref="patientChooseTable"
            highlight-current-row
            :data="patientList">
            <el-table-column
              label="病历号"
              prop="rId"
              width="100"
            ></el-table-column>
            <el-table-column
              label="患者姓名"
              prop="pName"
              width="80"
            ></el-table-column>
            <el-table-column
              label="患者身份证号"
              prop="pId"
              ></el-table-column>
            <el-table-column
              label="患者性别"
              prop="pSex"
              width="80"
            >
            </el-table-column>
            <el-table-column
              label="患者生日"
              prop="pBirth"
              width="150"
            >
            </el-table-column>
            <el-table-column
              label="家庭住址"
              prop="pAddress"
              width="300"
            >
            </el-table-column>
            <el-table-column>
          <template slot-scope="scope">
            <el-button type="text" @click="setCurrent(scope.row)">使用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="patientChooseDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onTapConfirm" >确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import patientExamination from '@/components/medicalLaboratory/patientExamination'
  import patientTest from '@/components/medicalLaboratory/patientTest'
  import patientDispose from '@/components/medicalLaboratory/patientDispose'
    export default {
        name: "medicalLaboratory",
      data(){
          return{
            viewPatient:false,
            searchPName:'',
            searchRId:'',
            patient:{},
            patientList:[],
            patientChooseDialogVisible:false,
            tempPatient:{},
            dId:'',
            departmentList:[]
          }
      },created:function () {
        let that = this
        this.$axios({
          url:"department/getAllDepartments",
          method:"post",
        }).then(response=>{
          that.departmentList = response.data
        })
      },
      methods:{
          setCurrent(row) {
            this.tempPatient = row
            this.$refs.patientChooseTable.setCurrentRow(row);
          },
          /**
           * 搜索病人
           */
          onTapSearch:function () {
            let that = this
            that.tempPatient = {}
            that.patientList = []
            let rId = (this.searchRId === '')?-1:this.searchRId
            this.patientChooseDialogVisible = true
            this.$axios({
              url:'registration/getRegistrationInfoByrIdOrPName',
              method:'post',
              data:{
                rId:rId,
                pName:this.searchPName
              }
            }).then(response=>{
              console.log(response.data)
              for(let i = 0; i < response.data.length; i++){
                let pSex = response.data[i].pSex?'男':'女'
                that.patientList.push({
                  rId:response.data[i].rId,
                  pId:response.data[i].pId,
                  pName:response.data[i].pName,
                  pBirth:response.data[i].pBirth,
                  pAddress:response.data[i].pAddress,
                  pSex:pSex
                })
              }
            })
          },
          onTapConfirm:function () {
            this.patient = this.tempPatient
            this.patientChooseDialogVisible = false
          }
        }
      ,components:{
          'patientExamination':patientExamination,
        'patientTest':patientTest,
        'patientDispose':patientDispose
      },watch:{
      }
    }
</script>

<style scoped>

</style>
