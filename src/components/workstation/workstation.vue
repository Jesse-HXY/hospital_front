<template>

  <el-container style="height: 100%; border: 1px solid #eee">

    <transition name="el-zoom-in-top">
      <el-aside v-if="viewPatient" width="420px" style="border: 1px solid #eee;text-align: left;" >
        <el-container>
          <el-header>
            请选择科室：
            <el-select style="width: 100px;" v-model="dId" @change="dIdChange" filterable placeholder="请选择科室">
              <el-option
                v-for="department in departmentList"
                :key="department.dId"
                :label="department.dName"
                :value="department.dId">
              </el-option>
            </el-select>
          </el-header>
          <el-main>
            <div style="margin-top: 15px;">
              <el-input placeholder="请输入内容" v-model='searchPName' class="input-with-select">
                <el-button slot="prepend" >
                  患者名：
                </el-button>
                <el-button slot="append" icon="el-icon-search" @click="onTapSearch"></el-button>
              </el-input>
            </div>
          </el-main>
          <el-footer>
            <template>
              <el-tabs type="card">
                <el-tab-pane label="本人" name="first">
                  <el-tag>未诊患者</el-tag>
                  <el-container style="height:50% ;border: 1px solid #eee;">
                    <el-table :data="notFinishPatientList">
                      <el-table-column label="患者姓名">
                        <template slot-scope="scope">
                          <el-button
                            @click="selectPatient(scope.row)">{{scope.row.pName}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-container>
                  <el-tag>已诊患者</el-tag>
                  <el-container style="height:50% ;border: 1px solid #eee;">
                    <el-table :data="finishPatientList">
                      <el-table-column label="患者姓名">
                        <template slot-scope="scope">
                          <el-button
                            @click="selectPatient(scope.row)">{{scope.row.pName}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-container>
                </el-tab-pane>
              </el-tabs>
            </template>
          </el-footer>
        </el-container>



      </el-aside>
    </transition>
    <el-container>
      <el-header style="text-align: left;height: 30px;display: inline-block">
        <el-row>
          <el-col :span="20">
            <div class="grid-content">
              <el-button v-if="viewPatient" @click="viewPatient=false" size="mini">隐藏患者栏</el-button>
              <el-button v-else @click="viewPatient=true" size="mini">显示患者栏</el-button>
              患者姓名：{{patient.name}} 病历号：{{patient.rId}} 年龄：{{patient.age}} 性别：{{patient.sex}}
            </div></el-col>

        </el-row>

      </el-header>
      <el-main>
        <el-tabs>
          <el-tab-pane label="病历首页"><registrationMain v-bind:rId="rId"></registrationMain></el-tab-pane>
          <el-tab-pane label="检查申请"><applyExamination v-bind:dId="dId" v-bind:rId="rId"></applyExamination></el-tab-pane>
          <el-tab-pane label="检验申请"><testApplication v-bind:dId="dId" v-bind:rId="rId"></testApplication></el-tab-pane>
          <el-tab-pane label="门诊确诊"><confirmed v-bind:rId="rId"></confirmed></el-tab-pane>
          <el-tab-pane label="处置申请"><applyDispose></applyDispose></el-tab-pane>
          <el-tab-pane label="成药处方"><medicinePrescription v-bind:did="did" v-bind:rId="rId"></medicinePrescription></el-tab-pane>
          <el-tab-pane label="草药处方"><herbalPrescription></herbalPrescription></el-tab-pane>
          <el-tab-pane label="费用查询"><feeInquiry></feeInquiry></el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>


</template>
<script>
  import applyExamination from '@/components/workstation/applyExamination'
  import registrationMain from '@/components/workstation/registrationMain'
  import confirmed from '@/components/workstation/confirmed'
  import applyDispose from  '@/components/workstation/applyDispose'
  import medicinePrescription from  '@/components/workstation/medicinePrescription'
  import herbalPrescription from '@/components/workstation/herbalPrescription'
  import feeInquiry from '@/components/workstation/feeInquiry'
  import testApplication from '@/components/workstation/testApplication'

  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        searchPName:'',
        viewPatient:true,
        centerDialogVisible: false,
        finishPatientList:[],
        notFinishPatientList:[],
        uId:0,
        patient:{},
        departmentList:[],
        dId:'',
        rId:0,
        right:'right'
      };
    },created:function(){
      let that = this
      this.uId = this.$cookie.get('uId')
      this.$axios({
        url:'department/selectByuId',
        method:'post',
        data:{
          uId:that.uId
        }
      }).then(response=>{
        that.departmentList = response.data
      })
    },
    methods: {
      onTapSearch:function () {
        let that = this
        this.$axios({
          url:'registration/getRegistrationInfoByuIdAndDId',
          method:'post',
          data:{
            rStatus:'诊毕',
            pName:that.searchPName,
            uId:that.uId,
            dId:that.dId
          }
        }).then(response=>{
          that.finishPatientList = response.data
        }).catch(err=>{console.log(err)})
        this.$axios({
          url:'registration/getRegistrationInfoByuIdAndDId',
          method:'post',
          data:{
            rStatus:'',
            pName:that.searchPName,
            uId:that.uId,
            dId:that.dId
          }
        }).then(response=>{
          that.notFinishPatientList = response.data
          console.log(that.notFinishPatientList)
        }).catch(err=>{console.log(err)})
      },
      /**
       * 选择
       * @param patient
       */
      selectPatient:function (patient) {
        console.log(patient)
        this.patient = {
          name:patient.pName,
          rId:patient.rId,
          age:this.jsGetAge(patient.pBirth),
          sex:patient.pSex?"男":"女"
        }
        this.rId = patient.rId
        this.$cookie.set('pId',patient.pId)
      },
      jsGetAge:function(strBirthday){
        var strBirthdayArr=strBirthday.split("-");
        var d = new Date();
        var yearDiff = d.getFullYear()-strBirthdayArr[0];
        var monthDiff = d.getMonth() + 1-strBirthdayArr[1];
        var dayDiff = d.getDate()-strBirthdayArr[2];
        var age=monthDiff<0||(monthDiff==0&&dayDiff<0)?yearDiff-1:yearDiff; //判断有没有到生日,没到就减1
        return age=age<0?0:age;
      },
      /**
       * did改变获取检查项目模版
       */
      dIdChange:function () {
        this.$cookie.set('dId',this.dId)
        this.onTapSearch()
        // applyExamination.$emit('getExaminationTemplate',applyExamination)
      }
    },
    components:{
      'applyExamination':applyExamination,
      'registrationMain':registrationMain,
      'confirmed':confirmed,
      'applyDispose': applyDispose,
      'medicinePrescription':medicinePrescription,
      'herbalPrescription':herbalPrescription,
      'feeInquiry':feeInquiry,
      'testApplication':testApplication
    },watch:{
      'searchPName':'onTapSearch'
    }
  }
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
