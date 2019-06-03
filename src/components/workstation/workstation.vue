
<template>

  <el-container style="height: 100%; border: 1px solid #eee">

    <transition name="el-zoom-in-top">
    <el-aside v-if="viewPatient" width="420px" style="border: 1px solid #eee" >
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="15"><div class="grid-content bg-purple">
              <el-input placeholder="患者选择" disabled></el-input></div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content " style="text-align: right">
                <el-button type="primary" icon="el-icon-refresh"></el-button></div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model='searchrId' class="input-with-select">
              <el-button slot="prepend" >
                患者名：
              </el-button>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-main>
        <el-footer>
          <template>
            <el-tabs type="border-card">

              <el-tab-pane label="本人" name="first">
                <el-tag>未诊患者</el-tag>
                <el-container style="height:50% ;border: 1px solid #eee;">
                  <el-table>
                    <el-column>

                    </el-column>
                  </el-table>
                </el-container>
                <el-tag>已诊患者</el-tag>
                <el-container style="height:50% ;border: 1px solid #eee;">
                  <el-table>
                    <el-column>

                    </el-column>
                  </el-table>
                </el-container>
              </el-tab-pane>




              <el-tab-pane label="科室" name="second">



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
          <el-col :span="2">
            <div class="grid-content ">
              <template >
            <el-button type="text" @click="centerDialogVisible=true" v-show="showLogin">登录</el-button>
                <el-tag v-show="!showLogin">{{username}}</el-tag>
              <el-button type="text">注销</el-button>
              </template>
          </div></el-col>
        </el-row>

        <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <span>用户名<el-input v-model="username" placeholder="请输入用户名"></el-input></span>
          <span>密码<el-input v-model="password" placeholder="请输入密码"></el-input></span>

          <span slot="footer" class="dialog-footer">

              <el-button @click.native="handleShow">取 消</el-button>
              <el-button type="primary" @click.native="handleShow" >确 定</el-button>


  </span>
        </el-dialog>


      </el-header>
      <el-main>
        <el-tabs>
          <el-tab-pane label="病历首页"><registrationMain></registrationMain></el-tab-pane>
          <el-tab-pane label="检查申请"><applyExamination></applyExamination></el-tab-pane>
          <el-tab-pane label="门诊确诊"><confirmed></confirmed></el-tab-pane>
          <el-tab-pane label="检验申请">角色管理</el-tab-pane>
          <el-tab-pane label="处置申请"><applyDispose></applyDispose></el-tab-pane>
          <el-tab-pane label="成药处方"><medicinePrescription></medicinePrescription></el-tab-pane>
          <el-tab-pane label="草药处方"><herbalPrescription></herbalPrescription></el-tab-pane>
          <el-tab-pane label="费用查询">定时任务补偿</el-tab-pane>


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


  export default {
    data() {
        let showLogin=true;
        let username= '';
        let password = '';
      return {
        activeIndex: '1',
        activeIndex2: '1',
        searchrId:'',
        viewPatient:true,
        centerDialogVisible: false,
        showLogin:showLogin,
        username:username,
        password:password,
        patient:{
          name:'黄萎男',
          rId:'3838438',
          age:38,
          sex:'变性人'
        }
      };
    },
    methods: {
            handleShow:function () {
             this.showLogin=false;
             this.centerDialogVisible=false;
             console.log(this.showLogin)
            }
    },
    components:{

      'applyExamination':applyExamination,
      'registrationMain':registrationMain,
      'confirmed':confirmed,
      'applyDispose': applyDispose,
      'medicinePrescription':medicinePrescription,
      'herbalPrescription':herbalPrescription,

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
